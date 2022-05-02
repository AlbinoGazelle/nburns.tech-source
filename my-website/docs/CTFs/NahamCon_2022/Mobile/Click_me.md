---
title: Click Me
sidebar_position: 1
---

## Opening APK in ADB and JADX

Given apk file. Open with JADX to view source code. Interesting functions pop out to me:  

![image](/img/CTFs/NahamCon_2022/jadx_function.png)

Need to somehow get CLICKS to over 99 million.. Thought I could make an autoclicker and let it run but if you look at `cookieViewClick` we can't get any higher than 13371337.  

Open APK using adb to see how it works:  
![image](/img/CTFs/NahamCon_2022/cookie_final.png)


So autoclicker is out of the option, lets try to patch this apk and set the required cookies to a small number.  

## Decompiling APK with APK_Tool and VSCode

Decompile apk using `apk_tool`   
![image](/img/CTFs/NahamCon_2022/apk_open.png) 

Open resulting folder in vscode and get ready to change some code  
Open the entire directory and navigate to `\smali\example\clickme\MainActivity.smali`  
Look for the hex value for that large value we saw earlier `5F5E0FF`  
Edit that hex value to just 9. (or any value, just remember it)  

Previous Function:  
![image](/img/CTFs/NahamCon_2022/original_func.png)  


Changed Function:  

![image](/img/CTFs/NahamCon_2022/new_func.png)  

Recompile apk using apktool:  

![image](/img/CTFs/NahamCon_2022/apk_compile.png)  

## Signing New APK
### IMPORTANT!!!

You must sign the apk, v1 signing wasn't working for me so I jumped to V3  
First create a key file:  

![image](/img/CTFs/NahamCon_2022/creating_key.png)
Now sign the apk using apksigner:  
![image](/img/CTFs/NahamCon_2022/signing_apk.png)  

Verify results:  
![image](/img/CTFs/NahamCon_2022/verifying_signing.png)  

## Load New APK Into ADB

Load APK file back into our ADB VM and click until you get to the number you changed in the smali file  
![image](/img/CTFs/NahamCon_2022/cookie_final.png)  

## Flag
Click GET FLAG to see the flag:  
![image](/img/CTFs/NahamCon_2022/flag.png)  