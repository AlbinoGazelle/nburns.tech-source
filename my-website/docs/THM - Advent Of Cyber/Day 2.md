---
title: Elf HR Problems (Day 2)
sidebar_position: 3
---
## Topic: Web Exploitation

Website allows you to create a user but says you arent authenticated.
Use developer console to see cookies, put cookie in cyberchef using "magic" query to identify what it is.  
Decode value and change username to "administrator", set cookie and then read flag.
Mitigation: Do server side validation of cookies.