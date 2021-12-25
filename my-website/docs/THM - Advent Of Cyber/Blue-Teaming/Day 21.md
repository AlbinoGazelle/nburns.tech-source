---
title: Needles In Computer Stacks (Day 21)
sidebar_position: 22
---
## Topic: Blue Teaming
### Learning Objectives:
Good repo with yara rules: https://github.com/InQuest/awesome-yara

In this task, we will learn:

-   What are Yara rules
-   What is the basic structure of Yara rules
-   How to write basic Yara rules
-   How Yara rules are used

### Questions:
1. We changed the text in the string ``$a as shown in the _eicaryara_ rule we wrote, from X5O to X50, that is, we replaced the letter O with the number 0.`` The condition for the Yara rule is _$a and $b and $c and $d_. If we are to only make a change to the first boolean operator in this condition, what boolean operator shall we replace the 'and' with, in order for the rule to still hit the file?  
answer: `or`   
2. What option is used in the Yara command in order to list down the metadata of the rules that are a hit to a file?  
answer: `-m`   
3. What section contains information about the author of the Yara rule?  
answer: `metadata`   
4. What option is used to print only rules that did not hit?  
answer: `-n`   
5. Change the Yara rule value for the $a string to X50. Rerun the command, but this time with the -c option. What is the result?   
answer: `0`   