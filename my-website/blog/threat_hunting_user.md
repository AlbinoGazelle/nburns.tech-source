---
slug: fun_with_hunting_user
title: Hunting for Low Complexity Attacks
authors: nathan
tags: [threat hunting, detection, purple team]
sidebar_position: 1
---



## Hello!  
Welcome to the first part in a series I'm creating to help develop my threat hunting skills and share some knowledge with the community in the process. This part will focus on hunting for techniques used by a potentially malicious user such as privilege escalation, data exfiltration, and more.  


Unless you've been under a rock for the past couple of months you've most likely heard of a new cybercrime group named LAPSUS$. This group utilizes social engineering and low technical complexity attacks to breach a target organization. They gain access to organizations by offering low-level employees monetary rewards in exchange for their credentials, once inside an organization they make attempts to escalate privileges and do reconnaissance to look for valuable data. 

Thanks to [Bill Demirkapi](https://twitter.com/BillDemirkapi), we can see what LAPSUS$ does during an attack with some level of detail. I'll be following the steps Mandiant identified LAPSUS$ did during their breach of Sitel/SYKES, you can find these steps [here.](https://twitter.com/BillDemirkapi/status/1508527487655067660)  

![image](/img/threat_hunt_user/mandiant_report_1.png)
*Figure 1. Page 1 of Mandiant's Sitel/SYKES Intrusion Timeline*  

## Scenario

The scenario I've laid out is we are a member of the threat intelligence team at Happy Corp© and we've been tasked to make sure our organization hasn't also been breached by LAPSUS$. We have a couple of tools available to us, most notably being Splunk (our SIEM), VirusTotal (to lookup potentially malicious binaries), and Talos (For finding the reputation of an IP/Domain), and various other open-source tools.

## Initiate

Now that we have a scenario, it's time to initiate the hunt. The first step in initiating is to identify a "trigger" for the hunt, in other words, what started this specific hunt? In our case, it's a historical incident (The Sitel/SYKES breach). After identifying the trigger we need to create an abstract. This is created so that once the hunt is selected for execution, we have an outline with details to help guide other hunters. 

### Abstract

Date: 4/23/2022 11:00 PM PDT  
Initial Hypothesis: A known threat actor has breached a similar organization recently, we need to ensure the TTPs used in that breach are properly detected in our environment and to ensure that the threat group is not inside our network. This group typically purchases credentials from employees, looking for initial access through valid accounts ([T1078](https://attack.mitre.org/techniques/T1078/)) should be a priority.   
Trigger: [Historical Incident (Sitel/SYKES breach)](https://venturebeat.com/2022/03/28/this-is-mandiants-timeline-for-the-okta-lapsus-breach-according-to-a-researcher/).  
Hunt Priority: High


## Execute

Here's the fun part. This is where we start executing the hunt and looking through data. Using our abstract we know the steps this actor uses, including gaining initial access through valid accounts (T1078) and exploitation for privilege escalation (T1068). Let's start building some queries to check if we've seen this behavior in our environment. 

When threat hunting it's extremely important to **know your logs**. In our scenario, we utilize Sysmon for log generation so being familiar with that format will allow this hunt to go smoothly. Let's look at common Sysmon Event IDs that could be related to this hunt:  

File Creation: Sysmon Event 11  
Network Connections (Including RDP): Sysmon Event 3   
Process Creation: Sysmon Event 1  

### Hunting for UserProfileSvcEoP Download

Let's start with Event 11:  

Query: `index="sysmon" EventID=11`

In our scenario that query gives us over 1,560 events in the past 30 days (!).   
![image](/img/threat_hunt_user/eventid_11.png)  
*Figure 2. EventID 11 Results*  

Let's try to trim that down a bit. We know this actor group uses a web browser to download this file so we can exclude a lot of results by modifying our query to only include web browser downloads.  
Query: 
```bash
index="sysmon" EventID=11 Image="C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" OR Image="C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
```  
![image](/img/threat_hunt_user/eventid_11_refined.png)   
*Figure 3. EventID 11 Results When Refined*  
This gets us down to 11 events. While this is a lot better, it's important to remember that I'm in a lab environment with a very small number of total events. In an actual production environment employees would be downloading things all the time through a web browser, let's try to refine it again! 

Ok, time for the last refinement. We know this threat actor downloads an **executable**. Let's refine our search to look for any executable downloaded from a web browser.  
*Side Note: During this hunt, we're assuming the threat actor changed the filename of the privilege escalation tool they used. In the actual Sykel/SITEL breach, this was not the case (!).*  

Query: 
```bash
index="sysmon" EventID=11  Image="C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" OR Image="C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe" AND file_name="*.exe"
```  
![image](/img/threat_hunt_user/eventid_11_refined_more.png)  
*Figure 4. EventID 11 Results Even More Refined*  

Amazing! This gets me down to just 4 events. Again, it's important to remember that this is a lab environment so in production that number will be orders of magnitude larger. If this query didn't refine my results down enough I'd have to utilize other tactics like looking for downloads after hours, looking through a specific window of time, or finding the user through other means and refining it that way.  

Looking through the results of the refined query, let's see if we've found the event we're looking for.   
Bingo! Look's like we've found the incident where a malicious user downloaded a known privilege escalation tool!   
![image](/img/threat_hunt_user/eventid_11_bingo.png)   
*Figure 5. Malicious User Downloading Privilege Escalation Tool*  
This is amazing (for us, not the organization), we now have the compromised username and a timeframe to work from! Let's take a look at what this user's done. Our knowledge of EventIDs will come into play again in doing this.

*Note: Timestamps from this point onwards won't align with earlier screenshots, I took a break writing this post!*
### Hunting for UserProfileSvcEoP Execution
Let's see if we can see when the actor ran the privilege escalation tool. Let's filter for EventID 1 (Process Creation) and the executable's name.  
Query: `index="sysmon" EventID=1 UserProfileSvcEoP.exe`  

![image](/img/threat_hunt_user/eventid_1_priv.png)  
*Figure 6. User Executing Privilege Escalation Tool*  

Time to put ourselves in the mindset of this attacker. What would I do next? Would I do some network recon? Look through the compromised host for interesting files? If I was the attacker the first thing I'd do after escalating privileges is to make it hard to cut off my access. This might involve creating a new user with RDP capabilities, installing remote access programs, or adding startup scripts to reenable my access. Let's take another look at what commands the compromised user ran and keep an eye out for anything that allows them to maintain persistence.

### Hunting for Persistence
One potential way an attacker could add an account is by using `net user`, a utility built into Windows that allows administrators to add and edit user accounts. Let's hunt for this activity. 

Query:
```sql
index="sysmon" Image="C:\\Windows\\System32\\net.exe" OR Image="C:\\Windows\\System32\\net1.exe" AND user=win
```
*Note: Ideally we'd have a timeframe defined in this query to make the results more manageable, I've opted out of that since I'm in a lab environment*  

![image](/img/threat_hunt_user/rdp_persist.png)  
*Figure 7. Attacker Activating Guest User Account with Admin and RDP Permissions*  

Executed Command:
```bash
cmd.exe /c "net user guest /active:yes & net user guest Password123! & net localgroup Administrators guest /add & net localgroup "Remote Desktop Users" guest /add & reg add "hklm\system\CurrentControlSet\Control\Terminal Server" /v fDenyTSConnections /t REG_DWORD /d 0 /f & reg add "hklm\system\CurrentControlSet\Control\Terminal Server" /v "AllowTSConnections" /t REG_DWORD /d 0x1 /f
```

Here we can see the attacker has activated the Guest user account, giving it Administrator and Remote Desktop permissions. 

## Document Findings

Alright, we've just gone through quite a chain of events. Let's take a break to note what the attackers done up to this point and then write some detections. We know the attacker has:  

**Make this cleaner, maybe add a table like the mandiant report?**

1. Complete access to the `win` user account. It is unknown how they gained the credentials to this account.
2. Downloaded a popular privilege escalation tool from GitHub and successfully executed it on the host `LAB-WIN-01`.
3. Complete control of this machine, including administrative permissions. 
4. Created a new user with administrative and remote desktop permissions.


## Detections

#### *Prevention is ideal, detection is a must*  

**Insert detections for downloading and executing UserProfileSvcEoP and creating guest administrator accounts here in this format**

Download UserProfileSvcEoP
```yaml
SIGMA RULE HERE


```

Executing UserProfileSvcEoP
```yaml

```

Creating Guest User Account With RDP and Admin Permissions
```yaml

```

## End

If you made it this far, thanks so much! I hope you learned as much reading this post as I did writing it. If you want to learn more about how I emulated these commands and wrote detections for them, please keep an eye out for my next post on **Atomic Red Team and Sigma Rules.** 

As always, thanks for reading. If you have any feedback please don't hesitate to [let me know.](/contact)

If you found this post informative, you can follow me on [twitter](https://twitter.com/AlbinoGazelle) to stay up to date on what I'm interested in!