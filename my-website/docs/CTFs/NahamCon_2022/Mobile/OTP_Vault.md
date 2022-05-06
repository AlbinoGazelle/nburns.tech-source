---
title: OTP Vault
sidebar_position: 1
---

## Challenge Description
*I created my own vault application to store my secrets. It uses OTP to unlock the vault so no one can steal my password!*  
Attachments: OTPVault.apk  

### Author
**congon4tor**

### Solves
**141/4034**

## Walkthrough

In this challenge we're given an APK file and a little description about what it's function is. Lets use Android Studio and ADB to emulate this program so we can get a sense of what we're working with.

*Note: Follow the instructions [here](https://developer.android.com/studio/install) to install Android Studio*

### Running The App
Open Android Studio, create a device and start it. Make sure it uses a recentish version of Android. Once open, drag the APK onto the phone to install it then open it.  

![image](/img/CTFs/NahamCon_2022/OTP_first_vault.png)

Here we can what the app does. We can try some common codes (1234, 4321, etc) to see if they work.

![image](/img/CTFs/NahamCon_2022/OTP_error_vault.png)

### Decompiling In JADX
After trying for a bit it became clear that we won't be able to guess the code, time to try something different, lets take a look at the internals of this app. 
Lets use [Jadx](https://github.com/skylot/jadx), an amazing Dex to Java decompiler. Follow the instructions on the github page to install this decompiler then open `OPTVault.apk` using it.  

The structure of APKs might be daunting at first but *generally* the important source code is located (in Jadx) in `Source Code\com`. Looking through here gives us the decompiled source code, **but** we can see an issue. This isn't all of the code. We can tell by searching for strings that exist in the GUI part of the app such as "Invalid OTP" and noticing we get zero results.

![image](/img/CTFs/NahamCon_2022/OTP_no_string.png)

### Dumping Source With APKTool
This is interesting, I'm not actually sure of why this happens but I believe that either OTPVault is loading a library the JADX isn't decompiling or there is some obfuscation done to hide some source code from JADX. Anyways, let's try to use another tool named [Apktool](https://ibotpeaches.github.io/Apktool/) to dump all the source code. Place apktool.jar in the same directory as OPTVault.apk and run this command: `.\apktool_2.6.1.jar d .\OTPVault.apk`. The source code will be dumped inside `\OTPVault\`. 

Opening `\OTPVault\` in VSCode and searching for `Invalid OTP` gives us 1 result in `index.android.bundle`.
![image](/img/CTFs/NahamCon_2022/OTP_yes_string.png)
### Interesting Code
When we open this file we can see that it's been minified, lets undo that using [unminify](https://unminify.com/). Searching for our earlier string leads us to this block of code:
```js
function O() {
                    var n;
                    (0, e.default)(this, O);
                    for (var o = arguments.length, u = new Array(o), l = 0; l < o; l++) u[l] = arguments[l];
                    return (
                        ((n = b.call.apply(b, [this].concat(u))).state = { output: "Insert your OTP to unlock your vault", text: "" }),
                        (n.s = "JJ2XG5CIMFRWW2LOM4"),
                        (n.url = "http://congon4tor.com:7777"),
                        (n.token = "652W8NxdsHFTorqLXgo="),
                        (n.getFlag = function () {
                            var e, o;
                            return t.default.async(
                                function (u) {
                                    for (;;)
                                        switch ((u.prev = u.next)) {
                                            case 0:
                                                return (u.prev = 0), (e = { headers: { Authorization: "Bearer KMGQ0YTYgIMTk5Mjc2NzZY4OMjJlNzAC0WU2DgiYzE41ZDwN" } }), (u.next = 4), t.default.awrap(p.default.get(n.url + "/flag", e));
                                            case 4:
                                                (o = u.sent), n.setState({ output: o.data.flag }), (u.next = 12);
                                                break;
                                            case 8:
                                                (u.prev = 8), (u.t0 = u.catch(0)), console.log(u.t0), n.setState({ output: "An error occurred getting the flag" });
                                            case 12:
                                            case "end":
                                                return u.stop();
                                        }
                                },
                                null,
                                null,
                                [[0, 8]],
                                Promise
                            );
                        }),
                        (n.onChangeText = function (t) {
                            n.setState({ text: t });
                        }),
                        (n.onPress = function () {
                            var t = (0, s.default)(n.s);
                            console.log(t), t === n.state.text ? n.getFlag() : n.setState({ output: "Invalid OTP" });
                        }),
                        n
                    );
                }
```

Looking at this code, we can see it makes a GET request to `http://congon4tor.com:7777/flag` using the Bearer token of `KMGQ0YTYgIMTk5Mjc2NzZY4OMjJlNzAC0WU2DgiYzE41ZDwN`.  
*Note: I suspect n.s is the OTP, I'm not sure what n.token is as it's only used once*  

Lets send a request to that URL using that token and see what happens  
```bash
curl -X GET http://congon4tor.com:7777/flag -H "Authorization: Bearer KMGQ0YTYgIMTk5Mjc2NzZY4OMjJlNzAC0WU2DgiYzE41ZDwN"
```
### Flag
![image](/img/CTFs/NahamCon_2022/OTP_request_flag.png)

Success! Thanks again to congon4tor for creating this great challenge! If you have any feedback on my site don't hesitate to [contact me](/contact). 

Thanks for reading!