---
title: Where Is All This Data Going (Day 9)
sidebar_position: 8
---
## Topic: Networking
Open given .pcap file in wireshark for analysis.  
Follow HTTP stream to get answer to question #2  
Filter for DNS and then search for "TXT" to find answer to question #4  
Filter for FTP to find answer to question #5  



### Questions
1. In the HTTP #1 - GET requests section, which directory is found on the web server?  
answer: `login`  
query: 	`http.request.method == GET`   
2. What is the username and password used in the login page in the **HTTP #2 - POST** section?  
answer: `McSkidy:Christmas2021`  
query: `http.request.method == POST`  
3. What is the User-Agent's name that has been sent in **HTTP #2 - POST** section?  
answer: `TryHackMe-UserAgent-THM{d8ab1be969825f2c5c937aec23d55bc9}`  
4. In the DNS section, there is a TXT DNS query. What is the flag in the message of that DNS query?
answer: `THM{dd63a80bf9fdd21aabbf70af7438c257}`
5. In the FTP section, what is the FTP command used to upload the secret.txt  file?  
answer: `TryH@ckM3!`  
6. In the FTP section, what is the FTP command used to upload the secret.txt  file?    
answer: `stor`    
7. In the FTP section, what is the content of the secret.txt file?  
answer:`123^-^321`  
