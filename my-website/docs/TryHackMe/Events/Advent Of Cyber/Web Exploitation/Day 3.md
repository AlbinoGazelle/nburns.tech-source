---
title: Christmas Blackout (Day 3)
sidebar_position: 4
---

## Topic: Web Exploitation

Use gobuster to enumerate webserver.  
command:
`gobuster dir -u http://10.10.172.110 -w /usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt -x html,txt,php`  
output:
```sql
===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.172.110
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.1.0
[+] Extensions:              txt,php,html
[+] Timeout:                 10s
===============================================================
2021/12/04 00:20:29 Starting gobuster in directory enumeration mode
===============================================================
/index.html           (Status: 200) [Size: 5061]
/admin                (Status: 301) [Size: 314] [--> http://10.10.172.110/admin/]
/assets               (Status: 301) [Size: 315] [--> http://10.10.172.110/assets/]
/javascript           (Status: 301) [Size: 319] [--> http://10.10.172.110/javascript/]
```

Find admin panel at `/admin`. Find login page:

![[admin.png]]

Look through source code and find default username and password:

`/admin/login-page.js`

![[default_creds.png]]

Login with credentials and get flag:

![[flag.png]]