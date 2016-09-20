---
layout: post
title:  "Setting up Gertty for effective code review"
date:   2016-09-20
tags:   [gertty, openstack]
---

[Gertty](https://github.com/openstack/gertty/) is a console-based client for
the [Gerrit code review tool](https://www.gerritcodereview.com/). 
Once you start doing a lot of code reviews as part of your daily work,
gertty proves to be an excellent alternative to the Gerrit web interface. For
one, it can work offline so it means it's possible to review code while on the
move. It also means the interface is more reactive since everything is cached
locally. Plus the fact that it's a console tool is really appealing to
programmers who spend their life in the terminal.

However, like all great tools, it needs a bit of configuration it in order to
deliver its full potential. I'm going to document here a few of the settings I'm
using in the context of OpenStack.

## Vim key bindings

If like me you like using the vim key bindings whenever possible, then you're
in luck. Gertty ships with a vi keymap and allows you to remap most of the
controls. To enable the vi bindings simply set `keymap: vi` in your
`.gertty.yaml` file. However, don't stop here or you'll be heading for serious
disappointment. The default vi keymap is rudimentary with only the four
direction keys `hjkl` and you'll need to redefine most of the combinations to
feel at home. 

Gertty supports key sequences in the form of `[key1, key2]` so you can easily
emulate a leader key or a command like `:q`.

Here is the configuration I am using for reference:

{% highlight yaml %}
keymaps:
  - name: vi
    cursor-down: ['j', 'down']
  - name: vi
    cursor-up: ['k', 'up']
  - name: vi
    cursor-left: ['h', 'left']
  - name: vi
    cursor-right: ['l', 'right']
  - name: vi
    cursor-page-up: ['ctrl u', 'page up']
  - name: vi
    cursor-page-down: ['ctrl d', 'page down']
  - name: vi
    cursor-max-left: ['^', 'home', 'ctrl a']
  - name: vi
    cursor-max-right: ['$', 'end', 'ctrl e']
  - name: vi
    quit: [[':', 'q'], 'ctrl q']
  - name: vi
    interactive-search: ['/']
  - name: vi
    toggle-hidden: [['t', 'h']]
  - name: vi
    toggle-star: [['t', '*']]
  - name: vi
    toggle-reviewed: [['t', 'r']]
  - name: vi
    toggle-list-reviewed: [['t', 'R']]
  - name: vi
    toggle-subscribed: [['t', 's']]
  - name: vi
    toggle-list-subscribed: [['t', 'S']]
{% endhighlight %}

Right now, the only thing I'm missing are the `G` and `gg` movements to go to
the bottom or top of the panel. They are apparently missing from the underlying
[urwid library](http://urwid.org/).


## Dashboards

In the spirit of the web interface, gertty also allows you to define your own
[dashboards](https://gerrit-review.googlesource.com/Documentation/user-dashboards.html).
The syntax is a bit different though, and as a consequence the [official
OpenStack
dashboards](http://gerrit-dash-creator.readthedocs.io/en/latest/dashboards/index.html#openstack-gerrit-dashboards)
can't be imported directly and need to be adapted slightly. Unfortunately,
I couldn't find documentation for gertty's query interface, so until someone
finds the courage and time to write it down, the
[source](https://github.com/openstack/gertty/blob/master/gertty/search/parser.py)
[code](https://github.com/openstack/gertty/blob/master/gertty/search/tokenizer.py)
remains your best resource.

Here is for example what I'm using for the Kolla project:
{% highlight yaml %}
dashboards:
  - name: "My changes"
    query: "owner:self status:open"
    key: "f2"
  - name: "Incoming reviews"
    query: "is:open is:reviewer"
    key: "f3"
  - name: "Kolla: Needs feedback"
    query: "project:^openstack/kolla.* status:open NOT owner:self label:Workflow>=0 NOT (label:Code-Review<=-1 or label:Code-Review>=1) age:2d"
    key: "f4"
  - name: "Kolla: Needs Approval"
    query: "project:^openstack/kolla.* status:open NOT owner:self label:Workflow>=0 (label:Verified>=1,jenkins or label:Verified>=1,zuul) label:Code-Review=2 NOT label:Code-Review<=-1"
    key: "f5"
  - name: "Kolla: No negative feedback"
    query: "project:^openstack/kolla.* status:open NOT owner:self (label:Verified>=1,jenkins or label:Verified>=1,zuul) NOT (label:Code-Review<=-1 or label:Code-Review>=1)"
    key: "f6"
  - name: "Kolla: Backports"
    query: "project:^openstack/kolla.* status:open NOT owner:self branch:stable/mitaka OR branch:stable/liberty"
    key: "f7"
  - name: "Kolla: Disagreement"
    query: "project:^openstack/kolla.* status:open (label:Verified>=1,jenkins or label:Verified>=1,zuul) label:Code-Review<=-1 label:Code-Review>=1"
    key: "f8"
{% endhighlight %}

## Keyword replacement

The OpenStack Gerrit instance conveniently replaces the [git commit message
tags it understands](https://wiki.openstack.org/wiki/GitCommitMessages) with
links to Launchpad issues or blueprints. Gertty offers that feature through
keyword replacements.

Here is for instance how to mimic that behavior:

{% highlight yaml %}
commentlinks:
  # Match external references to bugs on Launchpad
  - match: "(?P<bug_str>(?:[Cc]loses|[Pp]artial|[Rr]elated)-[Bb]ug *: *#?(?P<bug_id>\\d+))"
    replacements:
      - link:
          text: "{bug_str}"
          url: "https://launchpad.net/bugs/{bug_id}"
  # Match external references to blueprints on Launchpad
  - match: "(?P<bp_str>(?:[Bb]lueprint|bp) +(?P<blueprint>[\\w\\-.]+))"
    replacements:
      - link:
          text: "{bp_str}"
          url: "https://blueprints.launchpad.net/openstack/?searchtext={blueprint}"
{% endhighlight %}

## Filter job results by pipelines

That last one [hasn't yet made it](https://review.openstack.org/#/c/334578/) to
gertty. This is somewhat specific to OpenStack gerrit instance and how it works
with Zuul. The above commit lets you filter the job results by pipeline and
displays useful information like the date or the number of rechecks.

See what gertty looks like with the patch applied:

[![Gertty in action](/public/images/gertty.png)](/public/images/gertty.png)
