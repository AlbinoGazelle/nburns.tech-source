---
title: Poisoned
sidebar_position: 1
---

## Challenge Description
*Someone leaked their git credentials (developer:2!W4S5J$6e). Can you get their company secrets?*

*This challenge uses vhosts.  
Visit git.challenge.nahamcon.com:[YOUR_PORT]  
Visit drone.challenge.nahamcon.com:[YOUR_PORT]  *
### Author
**congon4tor**

### Solves
**82/4034**

## Walkthrough

This challenge gives us a set of credentials and two links. Since we're told the credentials are for git, lets open that page and login using them.

### Logging In

Heading to `git.challenge.nahamcon.com:MY_PORT_HERE` gives me this page:  
![image](/img/CTFs/NahamCon_2022/POISON_git_login.png)

After using the given credentials, we're asked to authorize an app, clicking authorize lets us proceed.   
![image](/img/CTFs/NahamCon_2022/POISON_app_auth.png)

After doing that we're sent to a second login page. We can enter anything here:  
![image](/img/CTFs/NahamCon_2022/POISON_drone_login.png)

That redirects us to `drone.challenge.nahamcon.com`. Lets head back to `git.challenge.nahamcon.com` and sign in to view the git repos.

### Fatal Flaw
We see there's a git repo at `http://git.challenge.nahamcon.com:30417/JustHacking/poisoned` additionally, based on this commit we can see how the CI/CD pipeline works and it's fatal flaw.   
![image](/img/CTFs/NahamCon_2022/POISON_git_commit.png)

Heading back to drone, we can see the flag is being echo'd here but due to drones security settings it isn't be displayed.  
![image](/img/CTFs/NahamCon_2022/POISON_drone_commit.png)

Before we make any changes lets make an ngrok tunnel using the command `ngrok 80 http` and save the url for later.  
![image](/img/CTFs/NahamCon_2022/POISON_ngrok_tunnel.png)

### Forking Repo
Lets fork this repo and make some changes to get the flag.  
![image](/img/CTFs/NahamCon_2022/POISON_mali_commit.png)
*New commit in our forked repo*

All that's left is to make a pull request and see if it sends the flag over. Lets go ahead and do that.  
![image](/img/CTFs/NahamCon_2022/POISON_pull_request.png)

![image](/img/CTFs/NahamCon_2022/POISON_git_output.png)
*Drone executing our .drone.yml*

### Flag
![image](/img/CTFs/NahamCon_2022/POISON_flag.png)

Success! It worked! The critical flaw in this app was allowing the CI/CD pipeline access to a secret environmental variable! 

Thanks again to congon4tor for the great challenge and thank you for reading! If you have any feedback please don't hesitate to [contact me](/contact).
