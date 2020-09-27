---
layout: post
title:  "Flashing Qualcomm-powered Android device from Linux"
date:   2020-09-27
tags:   [android]
---

Today I got fed up with the stock Android ROM -- and the lack of security
updates -- that came with my tablet and decided to switch to a [better
alternative](https://lineageos.org/).

The instruction for my device said to use
[QFIL](https://androidmtk.com/use-qualcomm-flash-image-loader-qfil) to flash
it. However, this is a Windows program and none of my computers run Windows.
The instruction had a few steps with the word `important` written in red
**bold** UPPERCASE, probably as a mean to discourage you experimenting and risk
bricking your device. The forum thread wasn't also very helpful to provide
instruction for Linux.

A quick Internet search later, I was on the
[qdl](https://www.96boards.org/documentation/consumer/guides/qdl.md.html) page
where the tool description says:
> As open source tool (for Linux) that implements the Qualcomm Sahara and
> Firehose protocols has been developed by Linaro, and can be used for program
> (or unbrick) MSM based devices, such as Dragonboard 410c or Dragonboard 820c.

This seems like it! However, no mention of QPST or QFIL, the two tools I read
about earlier. I decided to trust the nice folks at Linaro and indeed, this was
exactly the tool that I needed. 

As of today, there are no distribution packages available so we'll have to
build from source:
```bash
$ git clone https://git.linaro.org/landing-teams/working/qualcomm/qdl.git
$ cd qdl
$ sudo dnf install libxml2-devel libudev-devel
$ make
```

When in EDL mode, the device identifies itself as a Qualcomm modem and we need
to turn off `ModemManager` to prevent it from interfering:
```
sudo systemctl stop ModemManager
```

From there, I would change to directory where I unzipped the
[TWRP](https://twrp.me/) archive and run `qdl`:
```bash
$ sudo ./qdl/qdl --debug prog_emmc_firehose_8953_ddr.mbn rawprogram0.xml patch0.xml
Waiting for EDL device
```

After getting my device into EDL 9008 mode, in my case connecting it to my
computer while being powered off and holding the volume up button, `qdl`
noticed the device and started flashing it:
```
HELLO version: 0x2 compatible: 0x1 max_len: 1024 mode: 0
READ image: 13 offset: 0x0 length: 0x34
READ image: 13 offset: 0x34 length: 0x120
...
READ image: 13 offset: 0x53504 length: 0x720
END OF IMAGE image: 13 status: 0
DONE status: 0
qdl: failed to read: Connection timed out
FIREHOSE WRITE: <?xml version="1.0"?>
...
[PROGRAM] flashed "recovery" successfully at 15323kB/s
...
```

I could then follow the rest of the instruction and finish rooting my device.

After installing the custom ROM from TWRP and fixing a bootloop because
I stupidly forgot to install the [gapps](https://opengapps.org/), I got
everything working and am ready to enjoy using my tabled again.
