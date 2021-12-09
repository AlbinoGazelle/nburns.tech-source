---
slug: network_mon
title: Network Monitoring On A Budget
authors: nathan
tags: [networking, security]
---

I was fairly bored over thanksgiving weekend so I thought it'll be a good time to finally setup some home network monitoring I've been wanting to do for awhile. I had some raspberry pi 4's collecting dust so I decided to use them as hosts.

<!--truncate-->

## Materials

Two Raspberry Pi 4's

Any network switch capable of port mirroring.

Spare ethernet cables for connecting everything

Micro SD card reader (The Pi's come with micro SD cards but you'll need some way to format them) 

## Getting Started

The first thing you'll want to do is format each SD card (you should have two). Select the raspian (32-bit) image using the Pi imager available on the raspberry pi foundations website. If you don't feel like plugging in keyboards, mice and monitors you can create a file called "ssh" and put it in the root directory of the boot partition of the SD card. This will enable ssh on startup then you can use your router to find it's IP address and connect.

Set up port mirroring on your switch and connect one Pi to that port. This will be the Pi you'll be installing ntop on.

## Installation

Install ntop on the Pi connected to the mirrored port. Once installed you should be able to navigate to it's web interface at http://insert_pi_ip_here:3000

If everythings correctly configured, you should see every device on your network and the traffic associated with each device.

For extra control over your network, you can configure the second pi as a DNS server using pi-hole. This enable more data collection and allows you to block ads throughout your entire network.

## What's Next

Ntop has a very robust alert system. Do some research and figure out what alerts you want on your own network. I personally have alerts setup for receiving data from select countries or if any of my hosts go down.

## Conclusion

Overall you should have a very robust and configurable network monitoring system for about $80. Ntop allows for a lot of customization and configuration to suit whatever needs you might have while pi-hole allows for more configuration of your network as a whole and network wide ad blocking.