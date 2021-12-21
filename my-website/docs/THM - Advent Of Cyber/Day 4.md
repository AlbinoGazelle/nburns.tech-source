---
title: Santa's Running Behind (Day 4)
sidebar_position: 5
---
## Topic: Web Exploitation

Given a login portal, use supplied passwords to bruteforce page.
Use burp suite "battering ram" with login request to bruteforce:
![[Pasted image 20211204120411.png]]
Request with the password "cookie" is a different length, means we have the password.
Login with username "santa" password "cookie" to get flag
