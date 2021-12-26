---
title: How It Happened (Day 22)
sidebar_position: 23
---
## Topic: Blue Teaming
This challenge involved analyzing a malicious document that contained macros. We use the tool `oledump.py` to print out the encoded payload and then use `cyberchef` to decode the encoded payload. After we decode it we discover it contains the original email with hardcoded credentials. 

### Questions:
1. What is the username (email address of Grinch Enterprises) from the decoded script?  
answer: `Grinch.Enterprises.2021@gmail.com`   
2. What is the mailbox password you found?  
answer: `S@ntai$comingt0t0wn`   
3. What is the subject of the email?  
answer: `Christmas Wishlist`   
4. What port is the script using the exfiltrate data from the North Pole?  
answer: `587`   
5. What is the flag hidden found in the document that Grinch Enterprises left behind? (Hint: use the following command oledump.py -s {stream number} -d, the answer will be in the caption).  
answer: `YouFoundGrinchCookie`   
6. There is still a second flag somewhere... can you find it on the machine?   
answer: `S@nt@c1Au$IsrEAl`   