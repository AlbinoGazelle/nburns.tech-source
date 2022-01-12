---
slug: honeypot
title: Tutorial - Installing and Configuring a Honeypot in Google Cloud
sidebar_position: 2
---

I recently discovered that google cloud offers a $300 free credit to first time users so I decided to try and play around with setting up a honeypot to get some hands on experience with threat hunting and dipping a bit into reversing malware samples. 

## Prerequisites
1. Google Cloud Account. (GCloud will require payment if you dont have free credit)
2. Basic knowledge of linux commands and networking firewalls.
3. Knowledge of Elasticsearch and Kibana will be a plus, but not required.
## Virtual Machine Creation
Something to remember is for a majority of cloud providers (Google Cloud, AWS, Azure, Digital Ocean) the steps will be the same, but screenshots and names of pages through this tutorial will be created assuming you are using GCloud, though this tutorial can easily be used to deploy a honeypot on any hosting provider.
Another thing to note is please check the Terms of Service of whatever hosting provider you end up using, some may have provisions against hosting honeypots. I also cannot stress this enough **DO NOT HOST THIS ON YOUR HOME NETWORK**, it just isnt a good idea.

### Steps:
Lets assume you already have a Google Cloud account and jump straight into provisioning the virtual machine. 

First step is to ensure you're logged in and to head over to https://cloud.google.com and click the "Console" tab in the top right:

![image](/img/honeypot_tut/chrome_lbmqu91aak.png)

After that you'll want to search for "Add VM Instance" and click the first result, that should take you to page similar to this (disregard name and region information):
![image](/img/honeypot_tut/Pasted_image_20220111222953.png)

The name, region, and zone are all up to you. I suggest something close to your physical location as to reduce latency, but be aware that Google Cloud charges different rates depending on what region you select (There's also environmental friendly options labeled with a green leaf, which I highly suggest). I also suggest a relevant name.

Under machine configuration, you'll want to keep the series as E2 and while the minimum specs for the honeypot framework we'll be using recommends 8 GB of RAM and 2 CPU cores, I ran into some issues on Google Cloud using that so I *highly* suggest opting for 16 GB of RAM and 4 CPU cores. Using less than that can lead to crashes and poor performance.

![image](/img/honeypot_tut/chrome_bDbQQbbNyU.png)

Next thing we'll change is Boot Disk. Make sure the image is set to **Debian GNU/Linux 10 (buster)** as the framework we use *does not* support Ubuntu or other flavors of linux. Also change the size of the boot disk to **100+ GB**. 

![image](/img/honeypot_tut/chrome_JK90dwoUTG.png)

Thats all the configuration of the initial VM that we need to do, there are other optional options you can check out, but aren't required and may interfere with your ability to follow the rest of this tutorial. 

Click "Create" at the bottom of the page to provision the virtual machine.

## Configuration
Once you click "Create", you should be shown the VM instances dashboard and should see your new VM being created, after a couple of moments it should be available but we first should do some firewall configuration in google cloud. 

### Firewall Rules
#### Allow Unrestricted Access To Specified Ports
In Google Cloud, search for "firewall" and click the first option:

![image](/img/honeypot_tut/chrome_7XhYnCiGd9.png)

This will take you to the firewall management page of google cloud, from here we're going to click "Create Firewall Rule" to create a new rule.

First step is to name the rule something relevant and to add a description. You may think "nah, I don't need those I'll just skip them" but please don't. Documentation is extremely important in firewall rules and will allow you to understand what this rule does if you have to go back and edit it down the road. 

![image](/img/honeypot_tut/chrome_nuP2nQ987k.png)

Next thing we want to do is to change the priority, but this is only applicable if you have other non-default firewall rules as the default priority of 1000 is fine. **Direction of traffic** should be set to "Ingress" and **Action on match** should be set to "Allow". 
Depending on your configuration, the **Targets** section will vary. For me, I only host honeypots on google cloud so I changed the targets to "All instances in the network", if you have other virtual machines besides honeypots, you'll want to change it to "Specified target tags" and input the relevant target tag below. 

![image](/img/honeypot_tut/chrome_Xvtw7p2xF3.png)

Since this will be an "allow all" rule, we will specify the source IPv4 ranges to be "0.0.0.0/0".

![image](/img/honeypot_tut/chrome_PBTvdwobs1.png)

The last thing we'll do for this rule is to make sure **Protocols and ports** is set to "Specified protocols and ports", then we'll input the specified ports. This framework suggests ports 1 - 64000 to be allowed to the honeypot without restriction.

![image](/img/honeypot_tut/chrome_OiyOCnPmbn_1.png)

Click "Create" at the bottom to create this rule. All we have is one firewall rule left then we can get to work on the actual VM.


#### Restrict Access to Management Ports to Operator IP Address
One final firewall to create then we're done. If you've been following along, just click "Create Firewall Rule" again after completing the previous step.

This firewall rule will ensure only IP addresses you authorize are allowed to access the management interface of the honeypot. This is extremely useful if the management interface ever become vulnerable *cough Log4J cough*. It also helps prevent bruteforcing.

Lets speed through this one:

Give it a relevent name and description:

![image](/img/honeypot_tut/chrome_WiGoV1IrYr.png)

Configure Direction and Action on Match:

![image](/img/honeypot_tut/chrome_4eS8tUfwI4.png)

Configure source filter and IPv4 ranges. Replace YOUR_IP_ADDRESS_HERE with your own IP address(es). 

![image](/img/honeypot_tut/chrome_pZYJLAh3p6.png)

Please note that this will lockout everything else *besides* what IP you specific here. If you travel alot I would recommend using a VPN and whitelisting that IP (Not a VPN like NordVPN, you should never whitelist those as the IPs get recycled to other users, but one you host yourself like WireGuard or OpenVPN).

Configure port ranges:

![image](/img/honeypot_tut/chrome_5qbc40j8sv.png)

Create that rule and we're finally done with Google Cloud configuration! Now we'll be installing and configuring the virtual machine itself and install our honeypot framework. 
## Next Steps

## References



