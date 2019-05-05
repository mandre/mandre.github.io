---
layout: post
title:  "Bringing Kano to non-English speakers"
date:   2019-05-05
tags:   [kano]
---

## What is Kano?

[Kano](https://kano.me/) is a small educational Linux distribution to teach
computers to kids. Kano is great: if you have kids, definitely check it out.

[![Kano dashboard](/public/images/kano-dashboard.png)](/public/images/kano-dashboard.png)

It runs on a cheap [Raspberry Pi](https://www.raspberrypi.org/), the system is
[free](https://hello.kano.me/downloads/). It's perfect. Or almost...  It's only
available in English or Spanish and the company behind Kano, despite a few
promises in that sense, hasn't yet made it available to other languages.

However because Kano is Open Source, meaning you can modify it to your liking,
we do not rely on them to provide us with localized builds to enjoy the distro
in another language. With a few tweaks, you can do it yourself. Here is how.

## Make the system available in your language

Turn on your Kano computer and make sure it has network connectivity. Go to
`Advanced` and enable SSH. Then you can connect to it via SSH and change the
language of the system:

```
sudo dpkg-reconfigure locales
```

Select which locales you want to enable. For instance for French, I'm enabling
`fr_FR.UTF-8`. It's usually a good idea to always build `en_US.UTF-8`.
On the next screen you'll be able to select which locale will be the default one.

To make your change take effect, log out and log in again. If you don't know
what that means, simply restart your Kano computer.

Now that you're back in Kano you'll notice that the interface is... still in
English. What happened? Didn't we just changed the system locales? Yes we did.
In fact if you open an application such as the file browser or the calculator,
you'll see it applied your language preference. These applications are
originated from the wider Open Source community and include translation files,
contrary to the Kano developed applications.

We need to create those files. This is where you can help.

## Translating Kano applications

Translating software can be fun and doesn't require any particular technical
knowledge. All the sentences or words from the original software are extracted
into a file that serves as a template for new translation files.

There are several services that allow translating files online. Transifex,
Pootle, and Zanata are among the most well known.

I took the liberty to upload the Kano template files to Zanata because it is
free and offers a public instance. So far, I've created translation projects for:

* [Make Snake](https://translate.zanata.org/project/view/make-snake/) - the snake game
* [Terminal Quest](https://translate.zanata.org/project/view/terminal-quest/) - teach the use of the terminal
* [Kano Overworld](https://translate.zanata.org/project/view/kano-overworld/) - the application behind the Story Mode

For these projects I uploaded the existing translation files I could find on
the Internet and started contributing French translations.

[Create yourself an account](https://translate.zanata.org/account/register),
join the projects, and [start
translating](http://docs.zanata.org/en/release/user-guide/translator-guide/).

## Apply the changes

This is where it gets more complex. In an ideal world, the translation files
are included with the software and shipped with the next release. In this case
however, we'll have to upload the files to the Kano computer. This location is
different for each soft.

### For Make Snake

Clone the `make-snake` repository:

```
git clone git@github.com:KanoComputing/make-snake.git
```

Download the .po file, for example [for
French](https://translate.zanata.org/rest/file/translation/make-snake/Beta-v4.2.0/fr/po?docId=messages),
and copy it to the `po` directory as `fr.po`. The file name has to match the
language code. Finally run `make` from the `po` directory:

```
cd po
make
```

Copy the resulting `locale/fr/LC_MESSAGES/make-snake.mo` file to
`/usr/share/locale/fr/LC_MESSAGES/make-snake.mo` on the Kano computer.

### For Terminal Quest

For Terminal Quest, you'll follow the same process:

```
git clone git@github.com:KanoComputing/terminal-quest.git
# Add the translated .po file to the po directory
cd po
make
```

Then copy the resulting `terminal-quest.mo` to
`/usr/share/locale/YOUR_LOCAL/LC_MESSAGES/` on the Kano computer.


### For Story Mode

Kano-overworld is a different beast. It's a [LÖVE](https://love2d.org/)
application built using the lua programming language.
The translation template comes from the `kano-overworld-i18n-orig` package, but
I have yet to figure a way to turn the translated `.po` files back into a lua
dict that the application expects. So what I did instead was to copy the
original language resource and edit it in place.

The "Story Mode" files live in
`/usr/share/kano-overworld/build/kanoOverworld.love`. It's simply a zip
archive.

```
sudo apt-get install zip
mkdir kano-overworld
cd kano-overworld
unzip /usr/share/kano-overworld/build/kanoOverworld.love
cp -r res/locales/en_US/ res/locales/fr_FR/
vi res/locales/fr_FR/lang.lua
```

Then you can update the resources with:
```
zip -9 -r /usr/share/kano-overworld/build/kanoOverworld.love res/
```

Here is how it looks in French:

[![Kano Story Mode in French](/public/images/kano-overworld-fr.png)](/public/images/kano-overworld-fr.png)

## And now what?

This is only the beginning. I'm hoping that people will jump on board and help
translate the Kano applications in their languages.

I'll certainly push scripts to make this whole experience less hacky and make
is easier to update the distribution with the latest translations.

It's a bit unfortunate the Kano developers don't take i18n too seriously.
I understand they have business imperative and may not want to deal with
support for non-English users but that shouldn't prevent them from sharing the
tools they use internally and make it easier for the community to provide
translation files.

Perhaps one day Kano -- the company -- will integrate these language files in
their projects and finally open Kano -- the distribution -- to more users?
