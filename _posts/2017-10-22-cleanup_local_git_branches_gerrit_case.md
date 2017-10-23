---
layout: post
title:  "Cleanup local git branches - the Gerrit case"
date:   2017-10-22
tags:   [git, openstack]
---

If you've been working with git for long enough you've probably noticed the
local branches tend to accumulate. The `git branch` command provides a handy
option to filter branches where the tip commits also belongs to the current
branch:

    git branch --merged

This is great and works fine in the majority of case and is often found in
oneliners to cleanup local branches but this is not enough when working with
workflows where the commits are often rewritten a few times before they
eventually make it in tree, for example the Gerrit workflow we use in
OpenStack. Gerrit uniquely identifies the commit with the
[Change-Id](https://review.openstack.org/Documentation/user-changeid.html#_description),
a small label it inserts in the commit message and we can make advantage of
this to check if a commit has been merged or not and delete the local branch.

First we need to get the `Change-Id`:

```bash
# Get Change-Id of $commit
change_id=$(git log -n1 --pretty=format:%b $commit | awk '/Change-Id:/ {print $0}')
```

With this `Commit-Id` we can now verify if it was merged or not in the current
branch:

```bash
# Check that commit was merged into $current_branch
merged_commit=$(git log --pretty=format:%h --grep "$change_id" ${current_branch})
if [ -z "$merged_commit" ]; then
    # This change is missing from $current_branch
fi
```

Great, so now we can find commits that have not yet been merged in the current
branch. But what about the ones that were merged? It is entirely possible
someone pushed a new version of the patch in Gerrit, or maybe I made local
changes to a patch I haven't yet submitted for review and the change was merged
in the meantime. So if I blindly delete the branch I may lose important local
changes. How can I check the two versions of the patch are the same? The
`interdiff` tool compares diff files and we can assume they're the same when
the output is empty:

```bash
if [[ $(interdiff <(git show $commit) <(git show $merged_commit) 2>&1) ]]; then
    # The patch that was merged differs from what I have in local branch
fi
```

Putting it all together:

```bash
#!/bin/bash

function prompt_for_missing_commit {
    commit=$1
    branch=$2
    current_branch=$3
    git log --oneline -n1 $commit
    read -p "Commit $commit in $branch is missing from $current_branch. Inspect? [Yn] " answer
    if ! [[ "${answer,,}" =~ ^(n|no)$ ]]; then
        git show $commit
    fi
}

function prompt_for_commit_diff {
    local_commit=$1
    merged_commit=$2
    local_branch=$3
    current_branch=$4
    git log --oneline -n1 $commit
    read -p "Commit $local_commit in $local_branch and $merged_commit in $current_branch differ. Inspect? [Yn] " answer
    if ! [[ "${answer,,}" =~ ^(n|no)$ ]]; then
        interdiff <(git show $local_commit) <(git show $merged_commit) | colordiff
    fi
}

current_branch=$(git symbolic-ref --short HEAD)

for branch in $(git for-each-ref --format='%(refname:short)' refs/heads/); do
    if [ "$branch" == "$current_branch" ]; then
        continue
    fi
    echo
    echo "Checking branch $branch"
    branch_differs=0
    for commit in $(git log --no-merges --pretty=format:"%h" ${current_branch}..${branch}); do
        change_id=$(git log -n1 --pretty=format:%b $commit | awk '/Change-Id:/ {print $0}')
        if [ -z "$change_id" ]; then
            branch_differs=1
            prompt_for_missing_commit $commit $branch $current_branch
            continue
        fi
        merged_commit=$(git log --pretty=format:%h --grep "$change_id" ${current_branch})
        if [ -z "$merged_commit" ]; then
            branch_differs=1
            prompt_for_missing_commit $commit $branch $current_branch
            continue
        else
            # Check that the merged patch is similar to what is in local branch
            # NOTE needs interdiff from patchutils and colordiff
            if [[ $(interdiff <(git show $commit) <(git show $merged_commit) 2>&1) ]]; then
                branch_differs=1
                prompt_for_commit_diff $commit $merged_commit $branch $current_branch
            fi
        fi
    done
    if [ $branch_differs -eq 0 ]; then
        read -p "$branch fully merged. Delete? [yN] " answer
        if [[ "${answer,,}" =~ ^(y|yes)$ ]]; then
            git branch -D $branch
        fi
    else
        read -p "$branch differs from $current_branch. Delete anyway? [yN] " answer
        if [[ "${answer,,}" =~ ^(y|yes)$ ]]; then
            git branch -D $branch
        fi
    fi
done
```
