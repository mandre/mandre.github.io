---
layout: post
title:  "GitOps for the Free Cloud: Bridging Kubernetes and OpenStack with ORC"
date:   2026-06-18
tags:   [openstack, kubernetes, gitops, presentation]
---

Following up on the [ORC intro](/2025/10/18/manage_your_openstack_resources_from_kubernetes_with_orc.html) from last year's OpenInfra Summit, I [presented at DevConf.cz](https://pretalx.devconf.info/devconf-cz-2026/talk/CLHCXW/) how [ORC](https://k-orc.cloud) brings true GitOps to OpenStack infrastructure management. Since ORC exposes OpenStack resources as Kubernetes objects, standard GitOps tools like Argo CD or Flux can manage them like any other.

<center>
  <iframe src="https://drive.google.com/file/d/1wr3T-zvtGBirbMzcKUoz1ApADmbGxNjb/preview" width="800" height="450"></iframe>
</center>

Also check out the [recorded demo](https://www.youtube.com/watch?v=mCYMpRV4yVw) and its [companion repository](https://github.com/dlaw4608/devconf-orc-demo).
