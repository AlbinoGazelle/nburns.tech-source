---
title: Baby Apt - Forensics
sidebar_position: 2
description: I am testing descriptions
---
## Challenge Name: Baby Apt
### Topic: Forensics
### Challenge Prompt 
`This is the most wonderful time of the year, but not for Santa's incident response team. Since Santa went digital, everyone can write a letter to him using his brand new website. Apparently an APT group hacked their way in to Santa's server and destroyed his present list. Could you investigate what happened?`
### Walkthrough: 
Unzip challenge files and see that we're given a .pcap file.
First thing I do when I get a .pcap file is go to File -> Export Objects -> HTTP. This gives you a breakdown of all exportable HTTP objects such as files downloaded, any post requests, and more. If we do that to our .pcap we get a lot of interesting post requests to /db.php. 
Example:

![image](/img/cyber_santa/cmd_history.png)

Here we can see a post request with the following data:
`?cmd=groups`
This is really interesting, it seems like whoever was issuing this requests was able to execute commands on the webserver. Lets download these HTTP objects and examine them further.  
After downloading all those objects, we can look for some low hanging fruit by just grepping the directory for command strings like "HTB" or "flag", but alas it wont be *that* easy.  
My curriosity drove me to see exactly what these commands were, so I grepped for common files an attacker would want to see like `/etc/passwd` and `/etc/shadow` and we see them catting `/etc/passwd` here:
`grep -r "cmd" .`

![image](/img/cyber_santa/cmd_history_2.png)

Looking through the remainder of that grep command I see some interesting data that looks like base64:

![image](/img/cyber_santa/enc_flag.png)

Decoding that data gives the flag:
`HTB{0k_n0w_3v3ry0n3_h4s_t0_dr0p_0ff_th3ir_l3tt3rs_4t_th3_p0st_0ff1c3_4g41n}`

