---
layout: post
title:  "Hello Hubtty 👋"
date:   2021-10-10
tags:   [hubtty]
---

Part of my responsibilities at my day job involves reviewing other people's
code. There can be a fairly large number of Pull Requests in many different
repositories that I need to monitor. In the past, while I was working on
OpenStack, I was [quite fond of
Gertty](/2016/09/20/setting-up-gertty-for-effective-code-review.html) to give
me a quick glance of the new PRs and help me spend my time better. I missed
this tool after I changed teams and most of the code reviews happened on Github
rather than Gerrit.

About a year ago, I decided to scratch my own itch and looked at how hard it
would be to port Gertty to the Github API and workflow. It turned out to not be
so difficult: Gertty is well designed and it's a joy to work with its source
code. [Hubtty](https://github.com/hubtty/hubtty/) was born.

[![Hubtty v0.1](/public/images/hubtty/hubtty-0.1.png)](/public/images/hubtty/hubtty-0.1.png)

{:.image-caption}
*Meet Hubtty*

## How Hubtty came to be

OK, so where do I start? How do I port Gertty from Gerrit to Github?  A quick
look at the Github REST API tells me it should be possible to port most of the
Gertty's features relatively easily. I considered for a minute using a python
library to talk to the Github API but rapidly put this idea aside as it would
mean rewriting a lot of the sync module: Gertty uses the `requests` library to
talk to the Gerrit REST API directly and I figured I could simply reuse the
same call, but with the Gitub API instead as the two APIs are more or less
compatible.

After experimenting a bit, I was quickly able to retrieve the list of PRs for
each repositories the user had subscribed to. Excited with this early success
I set myself a goal to send the first review from Hubtty before the end of the
year (it was November) which [I barely
did](https://github.com/hubtty/hubtty/commit/9d5eb59ec7fb0df4e20553a545232bd87236a648).

At this time, Hubtty was still relying on an existing authorization token that
you had to create manually from the Github UI or "borrow" from another
application. Next step was to implement the [device
flow](https://docs.github.com/en/developers/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps#device-flow)
so that Hubtty could create Authorization tokens on the user's behalf. This
part was
[straightforward](https://github.com/hubtty/hubtty/commit/8ceac425dc05c726941b09906b8fb76e61305058)
but I realized it now forces the organizations to explicitely approve Hubtty
when they have enabled third-party application restrictions otherwise it
wouldn't be able to submit reviews. This is [still an
issue](https://github.com/hubtty/hubtty/issues/20) to this day.

After I started subscribing to more repositories I ran into issues with the
Github API rate limiting. The issue was rather obvious and quickly fixed.
A less obvious issue gave me a hard time and only manifested when I got back to
using Hubtty after some time -- think PTO -- where it would only sync part of the
PRs. It was an problem with how I handled the pagination for _some_ queries,
leading to this nasty synchronization issue.

Another big part was to port the search syntax to the Github search. As of
today, I've implemented the [most important search
operators](https://github.com/hubtty/hubtty/issues/48) and left out things we
do not yet synchronize with Hubtty.

Finally, I've also made Hubtty consistently use the Github terminology. For
example, it now uses `Repository` over `Project` (which means something
entirely different for Github), and `Pull Request` over `Change` to list the
most obvious. This was quite painful.

I used Hubtty as my inbox for PRs for the major part of this year and it was
getting more stable, to the point I'm no longer ashamed of recommending it to
others.

## What it looks like now

On Friday I released the first version of Hubtty, v0.1. It has reached a state
where it has feature parity with Gertty, or close enough, and is also stable
enough to be used by other developers.

It's available through the cheese shop, install it with:
```
pip install hubtty
```

Take a look:

[![Repositories list](/public/images/hubtty/01-Repositories-list.png)](/public/images/hubtty/01-Repositories-list.png)

{:.image-caption}
*List of subscribed repositories*

[![PRs list](/public/images/hubtty/02-PRs-list.png)](/public/images/hubtty/02-PRs-list.png)

{:.image-caption}
*List of PRs in a subscribed repository*

[![PR view](/public/images/hubtty/03-PR-view.png)](/public/images/hubtty/03-PR-view.png)

{:.image-caption}
*Opening a PR*

[![Diff view](/public/images/hubtty/04-Diff-view.png)](/public/images/hubtty/04-Diff-view.png)

{:.image-caption}
*Viewing code changes*

## Plans ahead

In the coming versions, I'd like to have it integrate better with the Github
features and improve UX. There is a lot to do, among other things:
- Markdown rendering
- Highlight PR with merge conflicts
- Highlight draft PRs
- Sync draft reviews
- Autocompletion for usernames
- Cherry-pick PRs
- [Reactions](https://docs.github.com/en/rest/reference/reactions)
- ...

I would also like to have hubtty packaged for the major distros. This should be
relatively straightforward considering gertty has already done the work for us.

I hope it's going to be as useful to you as it is to me.

Test it, give feedback, and report issues and feature requests on the [Github
project page](https://github.com/hubtty/hubtty/issues/).

Happy hacking!
