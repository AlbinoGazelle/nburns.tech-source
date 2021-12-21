---
title: Save The Gifts (Day 1)
sidebar_position: 2
---
## Topic: Web Exploitation

Website has an IDOR vulnerability that allows users to see details for other users. The user_id parameter can be changed, allowing an attacker to see details of users other than themselves.

The vulnerability in this web application is in the `user_id` parameter. A user can submit any user_id allowing for enumeration and information gathering. It could also allow an attacker to see data not intended for them. Mitigations would include a server-side check to ensure the user_id of the logged in user is the same as the parameter.

#### Questions:
After Finding Santa's account, what is their position in the company?  
`The Boss!` `user_id=1`  
After finding McStocker's account, what is their position in the company?  
`Build Manager` `user_id=3`  
After finding the account responsible for tampering, what is their position in the company?  
`Mischief Manager` `user_id=9`  
What is the received flag when McSkidy fixes the Inventory Management System?  
`THM{AOC_IDOR_2B34BHI3}`  