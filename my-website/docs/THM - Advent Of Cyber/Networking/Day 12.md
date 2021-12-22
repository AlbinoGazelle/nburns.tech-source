---
title: Sharing Without Caring (Day 12)
sidebar_position: 13
---
## Topic: Networking
nmap scan: `nmap -sC -sV -Pn -v 10.10.5.167`  
scan results:  
```bash
PORT     STATE SERVICE       VERSION
22/tcp   open  ssh           OpenSSH for_Windows_7.7 (protocol 2.0)
| ssh-hostkey: 
|   2048 b8:0b:21:22:72:ce:77:c5:b2:1f:e6:ad:80:48:5c:a7 (RSA)
|   256 56:dc:0c:78:a1:97:40:ad:b7:78:f8:72:44:97:bc:96 (ECDSA)
|_  256 1c:ac:1b:ea:2a:e0:cd:b0:47:48:96:c6:4d:73:47:25 (ED25519)
111/tcp  open  rpcbind       2-4 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/tcp6  rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  2,3,4        111/udp6  rpcbind
|   100003  2,3         2049/udp   nfs
|   100003  2,3         2049/udp6  nfs
|   100003  2,3,4       2049/tcp   nfs
|   100003  2,3,4       2049/tcp6  nfs
|   100005  1,2,3       2049/tcp   mountd
|   100005  1,2,3       2049/tcp6  mountd
|   100005  1,2,3       2049/udp   mountd
|   100005  1,2,3       2049/udp6  mountd
|   100021  1,2,3,4     2049/tcp   nlockmgr
|   100021  1,2,3,4     2049/tcp6  nlockmgr
|   100021  1,2,3,4     2049/udp   nlockmgr
|   100021  1,2,3,4     2049/udp6  nlockmgr
|   100024  1           2049/tcp   status
|   100024  1           2049/tcp6  status
|   100024  1           2049/udp   status
|_  100024  1           2049/udp6  status
135/tcp  open  msrpc         Microsoft Windows RPC
139/tcp  open  netbios-ssn   Microsoft Windows netbios-ssn
445/tcp  open  microsoft-ds?
2049/tcp open  mountd        1-3 (RPC #100005)
3389/tcp open  ms-wbt-server Microsoft Terminal Services
| rdp-ntlm-info: 
|   Target_Name: AOC2021-NFS
|   NetBIOS_Domain_Name: AOC2021-NFS
|   NetBIOS_Computer_Name: AOC2021-NFS
|   DNS_Domain_Name: AOC2021-NFS
|   DNS_Computer_Name: AOC2021-NFS
|   Product_Version: 10.0.17763
|_  System_Time: 2021-12-22T17:33:55+00:00
|_ssl-date: 2021-12-22T17:34:37+00:00; -2h59m28s from scanner time.
| ssl-cert: Subject: commonName=AOC2021-NFS
| Issuer: commonName=AOC2021-NFS
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2021-11-05T08:54:44
| Not valid after:  2022-05-07T08:54:44
| MD5:   67de dffc e00a 7c07 8fc3 d895 27ce 62b1
|_SHA-1: 8b28 8c49 7f3f 2323 244b 9eaa 9bce 6e4e 453b 7e9a
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
|_clock-skew: mean: -2h59m28s, deviation: 0s, median: -2h59m28s
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2021-12-22T17:33:59
|_  start_date: N/A

NSE: Script Post-scanning.
Initiating NSE at 12:37
Completed NSE at 12:37, 0.00s elapsed
Initiating NSE at 12:37
Completed NSE at 12:37, 0.00s elapsed
Initiating NSE at 12:37
Completed NSE at 12:37, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 343.69 seconds
```

Showmount command for question 4:  
`showmount -e MACHINE_IP`  
output:  
```Export list for 10.10.5.167:
/share        (everyone)  
/admin-files  (everyone)  
/my-notes     (noone)  
/confidential (everyone)  
```
### Questions:
1. Scan the target server with the IP `10.10.5.167`. Remember that MS Windows hosts block pings by default, so we need to add `-Pn`, for example, `nmap -Pn 10.10.5.167` for the scan to work correctly. How many TCP ports are open?  
answer: `7`  
2. In the scan results you received earlier, you should be able to spot NFS or mountd, depending on whether you used the `-sV` option with Nmap or not. Which port is detected by Nmap as NFS or using the mountd service?  
answer: `2049`
3. Now that we have discovered an NFS service is listening, let’s check what files are being shared. We can do this using the command `showmount`. In the terminal below, we run `showmount -e 10.10.5.167`. The `-e` or `--exports` show the NFS server’s export list.  
answer: `4`  
4. How many shares show "everyone"?  
answer: `3`  
5. What is the title of file 2680-0.txt?  
answer: `Meditations`  
6. It seems that Grinch Enterprises has forgotten their SSH keys on our system. One of the shares contains a private key used for SSH authentication (`id_rsa`). What is the name of the share?  
answer: `confidential`  
7. We can calculate the MD5 sum of a file using `md5sum FILENAME`. What is the MD5 sum of `id_rsa`?  
answer: `3e2d315a38f377f304f5598dc2f044de`  