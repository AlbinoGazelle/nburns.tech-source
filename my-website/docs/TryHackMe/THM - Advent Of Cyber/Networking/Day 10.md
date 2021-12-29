---
title: Offensive Is The Best Defensive (Day 10)
sidebar_position: 11
---
## Topic: Networking

### Questions:
1. Help McSkidy and run `nmap -sT 10.10.131.203`. How many ports are open between 1 and 100?  
answer:`2`  
2. What is the smallest port number that is open?  
answer: `22`  
3. What is the service related to the highest port number you found in the first question?    
answer: `HTTP`  
4. Now run `nmap -sS 10.10.131.203`. Did you get the same results? (Y/N)  
answer: `Y`  
5. If you want Nmap to detect the version info of the services installed, you can use `nmap -sV 10.10.131.203`. What is the version number of the web server?  
answer: `Apache httpd 2.4.49`  
6.  By checking the [vulnerabilities related to the installed web server](https://httpd.apache.org/security/vulnerabilities_24.html), you learn that there is a critical vulnerability that allows path traversal and remote code execution. Now you can tell McSkidy that Grinch Enterprises used this vulnerability. What is the CVE number of the vulnerability that was solved in version 2.4.51?  
answer: `CVE-2021-42013`  
7. You are putting the pieces together and have a good idea of how your web server was exploited. McSkidy is suspicious that the attacker might have installed a backdoor. She asks you to check if there is some service listening on an uncommon port, i.e. outside the 1000 common ports that Nmap scans by default. She explains that adding `-p1-65535` or `-p-` will scan all 65,535 TCP ports instead of only scanning the 1000 most common ports. What is the port number that appeared in the results now?  
answer:`20212`  
8. What is the name of the program listening on the newly discovered port?  
answer: `telnetd`  