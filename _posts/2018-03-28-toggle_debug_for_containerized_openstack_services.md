---
layout: post
title:  "Toggle Debug for containerized OpenStack services"
date:   2018-03-28
tags:   [openstack, containers]
---

## The general case with kolla based containers

The configuration file is generally bind-mounted to a staging directory in the
container then copied via the
[set_configs.py](https://github.com/openstack/kolla/blob/master/docker/base/set_configs.py)
script to the place as specified in `/var/lib/kolla/config_files/config.json`
file when the container starts. This means that changes to the config files on
the host will not affect the running containers, ensuring better isolation. You
would have to take a conscious decision and restart the container for the
config change to take effect. This is for example how Kolla-ansible and TripleO
proceed.

Say we want to bump the verbosity for the `nova_scheduler` service. In
a TripleO deployment, we would do:

```bash
$ sudo crudini --set /var/lib/config-data/puppet-generated/nova/etc/nova/nova.conf DEFAULT debug true 
$ sudo docker restart nova_scheduler
```

Now we're getting the DEBUG messages:
```bash
$ sudo grep DEBUG /var/log/containers/nova/nova-scheduler.log | wc -l
325
```

To revert back, we need to do the inverse change:
```bash
$ sudo crudini --set /var/lib/config-data/puppet-generated/nova/etc/nova/nova.conf DEFAULT debug false 
$ sudo docker restart nova_scheduler
```


## Reload config at runtime

Another -- and better -- option would be to take advantage of the oslo.config
[mutable config
mechanism](https://docs.openstack.org/oslo.config/latest/reference/mutable.html)
that allows changing service settings at runtime. This has the big advantage
that we're only changing the configuration in the container and we can easily
revert back by restarting the container.

Toggling the debug option at runtime was accepted as a [community goal for
Rocky](https://governance.openstack.org/tc/goals/rocky/enable-mutable-configuration.html)
meaning that all services should support it in the near future. This is already
the case for nova to let's see how it works in practice to turn debug on with
our previous `nova_scheduler` example. This time, we're editing the config file
directly in the container and send it a signal telling it to reload the
configuration:

```bash
$ sudo docker exec -u root nova_scheduler sed -ie 's/^[# ]*debug=false/debug=true/I' /etc/nova/nova.conf
$ sudo docker kill -s SIGHUP nova_scheduler
```

After we're done debugging, turning the log severity back to normal is just
a matter of restarting the container:

```bash
$ sudo docker restart nova_scheduler
```
