---
title: PowershELIF Magic (Day 23)
sidebar_position: 24
---
## Topic: Blue Teaming
### Learning Objectives:
-   Analyze Windows event logs to understand actions performed in an attack.
-   Recover key artifacts in unencrypted web communications. 
-   Utilize PowerShell Scripting to recover a delete artifact.  
Used an interesting tool in this challenge, FullEventLogView to parse event logs easier. Would be a good idea to pre install this for cyber defense competitions.  

### Questions: 
1. What command was executed as Elf McNealy to add a new user to the machine?  
answer: `Invoke-Nightmare`   
2. What user executed the PowerShell file to send the password.txt from the administrator's desktop to a remote server?  
answer: `adm1n`   
3. What was the IP address of the remote server? What was the port used for the remote connection? (format: IP,Port)  
answer: `10.10.148.96,4321`   
4. What was the encryption key used to encrypt the contents of the text file sent to the remote server?  
answer: `j3pn50vkw21hhurbqmxjlpmo9doiukyb`   
5. What application was used to delete the password.txt file?  
answer: `sdelete.exe`   
6. What is the date and timestamp the logs show that password.txt was deleted? (format: MM/DD/YYYY H:MM:SS PM)   
answer: `11/11/2021 7:29:27 PM`   
7. What were the contents of the deleted password.txt file?  
answer: `Mission control: letitsnowletitsnowletitsnow`   