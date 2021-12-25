---
title: What's the Worst That Could Happen? (Day 20)
sidebar_position: 21
---
## Topic: Blue Teaming
### Learning Objectives:

In this task, we will learn:
1.  How to identify the file type of a file regardless of file extension
2.  How to find strings in a file
3.  How to calculate hash of a file
4.  Using VirusTotal to perform preliminary analysis of a suspicious file
### Questions:
1. Open the terminal and navigate to the file on the desktop named 'testfile'. Using the 'strings' command, check the strings in the file. There is only a single line of output to the 'strings' command. What is the output?  
answer:`EICAR TEST STRING  
2. Check the file type of 'testfile' using the 'file' command. What is the file type?  
answer: `EICAR virus test files`   
3. Calculate the file's hash and search for it on VirusTotal. When was the file first seen in the wild?  
answer: `2005-10-17 22:03:48`   
4. On VirusTotal's detection tab, what is the classification assigned to the file by Microsoft?   
answer: `Virus:DOS/EICAR_Test_File`   
5. Go to [this link](https://www.eicar.org/?page_id=3950) to learn more about this file and what it is used for. What were the first two names of this file?  
answer: `ducklin.htm or ducklin-html.htm`   
6. The file has 68 characters in the start known as the known string. It can be appended with whitespace characters upto a limited number of characters. What is the maximum number of total characters that can be in the file?
answer: `128`   