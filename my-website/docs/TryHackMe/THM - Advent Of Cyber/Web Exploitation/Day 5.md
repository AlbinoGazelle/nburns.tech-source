---
title: Pesky Elf Forum (Day 5)
sidebar_position: 6
---
## Topic: Web Exploitation

Login on website:  
username: McSkidy  
Password: password    


Navigate to a forum page, test if XSS is possible with `<script>alert(1)</script>`

Success:
![[Pasted image 20211205223100.png]]

Mess around with login page and see I can reset password with this request:
![[Pasted image 20211205223301.png]]

Now that we have xss and a way to reset passwords, just need to get an admin to navigate to a page with our stored XSS payload. Can use javascript `fetch` to make the request.

payload: `<script>fetch('/settings?new_password=password1');</script>`

Wait a bit and login as the user `grinch`, go to settings and see the flag.
flag: `THM{NO_MORE_BUTTMAS}`  