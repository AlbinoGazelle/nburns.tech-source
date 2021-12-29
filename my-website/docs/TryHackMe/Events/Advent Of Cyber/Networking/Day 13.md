---
title: They Lost The Plan! (Day 13)
sidebar_position: 14
---
## Topic: Networking
Exploit privilege escalation vulnerability in Iperius backup program to get higher permissions. This included making a backup job in Iperius that executed a bat file prior to running the backup job. This bat file contained a reverse shell back to our attacker machine. Running the backup job as a service bypasses the administrator requirement.

## Questions:
1. Complete the username: p....    
answer: `pepper`  
2. What is the OS version?  
answer: `10.0.17763 N/A Build 17763`  
3. What backup service did you find running on the system?  
answer: `IperiusSvc`   
command: `wmic service list`
4. What is the path of the executable for the backup service you have identified   
answer: `C:\Program Files (x86)\Iperius Backup\IperiusService.exe`  
5. Run the whoami command on the connection you have received on your attacking machine. What user do you have?  
answer: `the-grinch-hack\thegrinch`  
6. What is the content of the flag.txt file?  
answer: `THM-736635221`  
7. The Grinch forgot to delete a file where he kept notes about his schedule! Where can we find him at 5:30?  
answer: `jazzercize`  