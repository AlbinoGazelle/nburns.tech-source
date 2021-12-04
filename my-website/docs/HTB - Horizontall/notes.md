---
title: Notes/Walkthrough
sidebar_position: 2
---

## Horizontall
## Enumeration:
### NMAP
```bash
nmap -sC -sV -oA nmap/nmap.scan $IP
```
```sql
# Nmap 7.92 scan initiated Wed Nov 24 12:38:22 2021 as: nmap -sC -sV -v -oA nmap/nmap.init 10.10.11.105
Nmap scan report for horizontall.htb (10.10.11.105)
Host is up (0.55s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.5 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 ee:77:41:43:d4:82:bd:3e:6e:6e:50:cd:ff:6b:0d:d5 (RSA)
|   256 3a:d5:89:d5:da:95:59:d9:df:01:68:37:ca:d5:10:b0 (ECDSA)
|_  256 4a:00:04:b4:9d:29:e7:af:37:16:1b:4f:80:2d:98:94 (ED25519)
80/tcp open  http    nginx 1.14.0 (Ubuntu)
|_http-title: horizontall
| http-methods: 
|_  Supported Methods: GET HEAD
|_http-server-header: nginx/1.14.0 (Ubuntu)
|_http-favicon: Unknown favicon MD5: 1BA2AE710D927F13D483FD5D1E548C9B
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Wed Nov 24 12:47:43 2021 -- 1 IP address (1 host up) scanned in 561.34 seconds
```
### gobuster
Nothing useful on horizontall.htb
fuzzing api-prod.horizontall.htb:
```bash
gobuster dir -u http://api-prod.horizontall.htb -w /usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt -x html,txt,php
```
output:
```bash
===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://api-prod.horizontall.htb
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.1.0
[+] Extensions:              html,txt,php
[+] Timeout:                 10s
===============================================================
2021/11/24 13:35:59 Starting gobuster in directory enumeration mode
===============================================================
/index.html           (Status: 200) [Size: 413]
/reviews              (Status: 200) [Size: 507]
/users                (Status: 403) [Size: 60] 
/admin                (Status: 200) [Size: 854]
/Reviews              (Status: 200) [Size: 507]
/robots.txt           (Status: 200) [Size: 121]
/Users                (Status: 403) [Size: 60] 
/Admin                (Status: 200) [Size: 854]
Progress: 74236 / 882244 (8.41%)              ^C
[!] Keyboard interrupt detected, terminating.
                                               
===============================================================
2021/11/24 13:47:47 Finished
===============================================================

```
### wfuzz
Enumerating subdomains:
```bash
wfuzz -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-110000.txt -u http://horizontall.htb --hc 301 -v -c -H "HOST:FUZZ.horizontall.htb"
```
Output:
```bash
********************************************************
* Wfuzz 3.1.0 - The Web Fuzzer                         *
********************************************************

Target: http://horizontall.htb/
Total requests: 114441

====================================================================================================================================================
ID           C.Time       Response   Lines      Word     Chars       Server                           Redirect                         Payload                                      
====================================================================================================================================================

000000001:   0.462s       200        1 L        43 W     901 Ch      nginx/1.14.0 (Ubuntu)                                             "www - www"                                  
000047093:   0.085s       200        19 L       33 W     413 Ch      nginx/1.14.0 (Ubuntu)                                             "api-prod - api-prod"                        
^C /usr/lib/python3/dist-packages/wfuzz/wfuzz.py:80: UserWarning:Finishing pending requests...

Total time: 0
Processed Requests: 47919
Filtered Requests: 47917
Requests/sec.: 0

```
## Information:
### Host Info
OS: Ubuntu (Unknown Version) 
Webserver: Nginx 1.14.0  
Ports open: 22, 80  
domains: horizontall.htb, api-prod.horizontall.htb  


## Notes:
Port 22 and 80 open.

Inspecting webserver on 80. None of the buttons work. Need to do 
further enumeration.

Error on webserver says its nginx 1.14.0 on ubuntu.

Hosting nginx, makes me think its not PHP.

Required adding hostname to /etc/hosts, maybe we have some subdomains?

Found api-prod subdomain with wfuzz, added to /etc/hosts.

Result from going to api-prod.horizontall.htb:
  
![image](/img/horizontall/welcome.png)

Time to do some enumeration on that subdomain.

Found some directories, one is /admin
  
![image](/img/horizontall/admin.png)  

Research exploits for strapi
Find some on exploit-db but don't know the version number of whats running on the host.
Inspecting one of the exploits gives me this url to check the version:
  
![image](/img/horizontall/version.png)

Our version is vulnerable to the exploit on [exploit-db](https://www.exploit-db.com/exploits/50239)
Use exploit to get credentials for admin user:
  
![image](/img/horizontall/admin_creds.png)

Now that I have a JWT token I can exploit the other CVE using this [script](https://github.com/z9fr/CVE-2019-19609/blob/main/exploit.py) to get a reverse shell on the box.

Running second stage exploit:
  
![image](/img/horizontall/second_stage.png)

Getting a shell:
  
![image](/img/horizontall/init_shell.png)

Need to get root
Getting the port fowarding was tricky, had to lookup guide.
Inspect machine to see what services are running, seeing laravel running locally so use chisel to port foward to attacker machine:
On client:
  
![image](/img/horizontall/chisel_client.png)

On attacker:
  
![image](/img/horizontall/chisel_server.png)

Now I can access the laravel service on my attacker machine:
  
![image](/img/horizontall/laravel.png)

Do some googling and find an exploit for this laravel version [here](https://github.com/nth347/CVE-2021-3129_exploit)
Run the exploit and I can cat the root flag:
  
![image](/img/horizontall/root_flag.png)