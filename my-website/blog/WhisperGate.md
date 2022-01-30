---
slug: whispergate
title: Analysis of WhisperGate Destructive Malware
authors: nathan
tags: [defense, reversing, malware, destructive, geopolitical]
sidebar_position: 1
image: https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/tnc_52026265.jpg
---


# Introduction

Destructive malware is some of the most dangerous software out there. Where a malicious coin miner might slow down your system or a RAT might be used to exfiltrate sensitive data, destructive malware exists for one purpose, causing damage. Arguably one of the most popular cyber attacks in history Stuxnet, was destructive in nature. The main aspect of ransomware that makes it so dangerous is it's destructive nature, if it didn't encrypt a system and make it unusable would anyone pay the ransom? 

On 1/15/2022 Microsoft released information on a new campaign targetting Ukrainian systems with destructive malware. It includes four different stages:
1. A purely destructive MBR wiper that displays a ransom note on next bootup.
2. Downloader that's used to download other stages of the attack.
3. Payload that adds an exclusion to Windows Defender and allows the final stage to be ran.
4. File corrupter that will corrupt any files with a specific extension.


# Stage 1
Stage 1 is a pretty basic executable. Essentially all it does is overwrite the MBR with the ransom note. It uses *CreateFileW* to create a file handler pointing to the Master Boot Record and uses *WriteFile* to overwrite the MBR with the ransom note.

Once this stage is executed the host machine is left inoperable. Interestingly enough, if a machine is utilizing UEFI (and cmon, its 2022. Every machine should be) the ransom note **will not** be displayed on next bootup but the host will still be inoperable.

Screenshot of impacted host:
![Image](https://media.discordapp.net/attachments/437733241496141826/937151814409793556/unknown.png)

The ransom note is quite humorous as by the time any user sees this message, the computer has been damaged and the MBR already wiped and there is no function to fix any damage caused. Thankfully no one has fallen for this and the BTC address posted above (and below in IOCs) has not received much BTC at the time of this post:
[1AVNM68gj6PGPFcJuftKATa4WLnzg8fpfv](https://www.blockchain.com/btc/address/1AVNM68gj6PGPFcJuftKATa4WLnzg8fpfv)

![[Pasted image 20220129094431.png]]


Decompiled wiper function (thanks Ghidra!):
![[Pasted image 20220129093558.png]]

## Detection Rules:
### Yara:
```
rule whispergate_stage_1 {
   strings:
       $s1 = "1AVNM68gj6PGPFcJuftKATa4WLnzg8fpfv"
       $s2 = "8BEDC411012A33BA34F49130D0F186993C6A32DAD8976F6A5D82C1ED23054C057ECED5496F65"
       $f1 = "WriteFile"
       $f2 = "CreateFileW"
   condition:
       1 of ($s*) and 1 of ($f*)
}
```
## MITRE ATT&CK Techniques
[T1561.002 - Disk Structure Wipe](https://attack.mitre.org/techniques/T1561/002/)
[T1491.001 - Internal Defacement](https://attack.mitre.org/techniques/T1491/001/)

# Stage 2
Stage 2 is where it gets more complex. It contains obfuscated code and starts downloading the next stage. I have zero experience decompiling .NET malware, but I was able to grab some interesting strings and see some weird behavior. A very interesting string is that this stage attempts to pull malware from discord, behavior that's been seen in the [past.](https://cyware.com/news/abuse-of-discord-cdn-witnesses-significant-rise-277d273d)

![[Pasted image 20220129125130.png]]

It also attempts to evade detection by "obfuscating" some variables
![[Pasted image 20220129125228.png]]

It's my guess that this stage is purely a dropper for stage 3, but my .NET decompilation skills are extremely weak so I decided to just run it in a closed lab environment with some sysmon rules. I plan on making a blogpost later on after I create a more detailed and *hopefully* safer malware analysis lab. 

Anyways, this was the behavior I spotted after running it in a lab environment.

The first thing it does it run this obfuscated powershell command:

![Image](https://media.discordapp.net/attachments/437733241496141826/937211009926594650/vmware_gEbM5IIhfa.png)

Decoded command:

![Image](https://media.discordapp.net/attachments/437733241496141826/937211008685047838/vmware_FIWwAGCyAz.png)

This command sleeps the script for 10 seconds until it downloads the stage 3 binary from **cdn.discordapp.com**, presumably using the obfuscated **DownloadData** powershell command.

![Image](https://media.discordapp.net/attachments/437733241496141826/937211009184186418/vmware_ZTnw9fJTgk.png)

This is all I could gather from the stage 2 binary, but it most certainly executes the stage 3 binary after successful download as well.
## Detection Rules:
### YARA:
```
rule whispergate_stage_2 {
	strings:
		$s1 = "DxownxloxadDxatxxax" wide ascii
		$s2 = "ttps://cdn.discordapp.com/attachments/928503440139771947/930108637681184768/Tbopbh.jpg" wide ascii
	condition:
		$s1 or $s2
}

```
## MITRE ATT&CK Techniques
[T1059.001 - Command and Scripting Interpreter: PowerShell](https://attack.mitre.org/techniques/T1059/001/)
[T1583.006 - Acquire Infrastructure: Web Services](https://attack.mitre.org/techniques/T1583/006/)

# Stage 3
Unfortunately I couldn't get my hands on the original stage 3 binary so I can't do much analysis. 
Sorry!

# Stage 4
This is a rather destructive final stage. It contains a list of file extensions that it will attempt to corrupt and then finally it will delete itself. To ensure the device is still "operable" it will ignore files in the `Windows` directory.

File Corrupter Function:

![[Pasted image 20220130023351.png]]
Opening File:
```
_File = _wfopen(Filename,L"wb");
```
Writing data to file (Corrupting it in the process):
```
fwrite(_Str,1,0x100000,_File);
```
Renaming file:
```
_wrename(Filename,pwVar2);
```

List of file extensions:
```
.HTML
.HTM
.SHTML
.XHTML
.PHTML
.PHP
.JSP
.ASP
.PHPS
.PHP5
.ASPX
.PHP4
.PHP6
.PHP7
.PHP3
.DOC
.DOCX
.XLS
.XLSX
.PPT
.PPTX
.PST
.OST
.MSG
.EML
.VSD
.VSDX
.TXT
.CSV
.RTF
.WKS
.WK1
.PDF
.DWG
.ONETOC2
.SNT
.JPEG
.JPG
.DOCB
.DOCM
.DOT
.DOTM
.DOTX
.XLSM
.XLSB
.XLW
.XLT
.XLM
.XLC
.XLTX
.XLTM
.PPTM
.POT
.PPS
.PPSM
.PPSX
.PPAM
.POTX
.POTM
.EDB
.HWP
.602
.SXI
.STI
.SLDX
.SLDM
.BMP
.PNG
.GIF
.RAW
.CGM
.SLN
.TIF
.TIFF
.NEF
.PSD
.SVG
.DJVU.SH
.CLASS
.JAR
.BRD
.SCH
.DCH
.DIP
.VBS
.PS1
.BAT
.CMD
.ASM
.PAS
.CPP
.SUO
.ASC
.LAY6
.LAY
.MML
.SXM
.OTG
.ODG
.UOP
.STD
.SXD
.OTP
.ODP
.WB2
.SLK
.DIF
.STC
.SXC
.OTS
.ODS
.3DM
.MAX
.3DS
.UOT
.STW
.SXW
.OTT
.ODT
.PEM
.P12
.CSR
.CRT
.KEY
.PFX
.DER
.OGG
.JAVA
.INC
.WAR
.KDBX
.INI
.YML
.PPK
.LOG
.VDI
.VMDK
.VHD
.HDD
.NVRAM
.VMSD
.VMSN
.VMSS
.VMTM
.VMX
.VMXF
.VSWP
.VMTX
.VMEM
.MDF
.IBD
.MYI
.MYD
.FRM
.SAV
.ODB
.DBF
.MDB
.ACCDB
.SQL
.SQLITEDB
.SQLITE3
.LDF
.SQ3
.ARC
.PAQ
.BZ2
.TBK
.BAK
.TAR
.TGZ
.RAR
.ZIP
.BACKUP
.ISO
.VCD
.CONFIG
```

Deletes self after being ran:
```
cmd.exe /min /C ping 111.111.111.111 -n 5 -w 10 > Nul & Del /f /q "%s"
```

## Lab Analysis:
Creating test files inside users download folder:
![Image](https://media.discordapp.net/attachments/437733241496141826/937433471649992814/unknown.png)
![Image](https://media.discordapp.net/attachments/437733241496141826/937433472186871888/unknown.png)

Files after execution of stage_4.exe: (Note the randomized file extensions)
![Image](https://media.discordapp.net/attachments/437733241496141826/937433471196999680/unknown.png)
![Image](https://media.discordapp.net/attachments/437733241496141826/937433470500761610/unknown.png?width=810&height=575)

### Sysmon logs generated:
Changing file extension and overwriting data:
![Image](https://media.discordapp.net/attachments/437733241496141826/937433402125209680/unknown.png)

Executing cleanup command to evade detection:
![Image](https://media.discordapp.net/attachments/437733241496141826/937433402464944198/unknown.png)

Corrupting additional files:
![Image](https://media.discordapp.net/attachments/437733241496141826/937433401621880862/unknown.png)



## Detection Rules:
### Yara:
```
rule whisphergate_stage_4 {
	strings:
		$f1 = "cmd.exe /min /C ping 111.111.111.111 -n 5 -w 10 > Nul & Del /f /q"
		$x1 = ".BACKUP" wide ascii
		$x2 = ".SQLITE3" wide ascii
		$x3 = ".DOCX" wide ascii 

	condition:
		$f1 and 1 of ($x*)
}
```

## MITRE ATT&CK Techniques:
[T1485 - Data Destruction](https://attack.mitre.org/techniques/T1485/)
[T1070.004 - Indicator Removal on Host: File Deletion](https://attack.mitre.org/techniques/T1070/004/)

# Conclusion

# IOCs
## Stage 1:
### SHA256: 
```a196c6b8ffcb97ffb276d04f354696e2391311db3841ae16c8c9f56f36a38e92```
### Unique Strings: 
```
1AVNM68gj6PGPFcJuftKATa4WLnzg8fpfv
```
```
8BEDC411012A33BA34F49130D0F186993C6A32DAD8976F6A5D82C1ED23054C057ECED5496F65
```
```
You should pay us  $10k via bitcoin wallet
```
### System Behavior:
Overwritting "\\\\.\\PhysicalDrive0" (MBR) with 512 bytes of the ransom note.
## Stage 2:
### SHA256: 
```dcbbae5a1c61dbbbb7dcd6dc5dd1eb1169f5329958d38b58c3fd9384081c9b78```
### Unique Strings:
Note: Make sure to specify 16 byte length when running strings `strings -e b file_name`  to see these.
```
DxownxloxadDxatxxax
```
```
ttps://cdn.discordapp.com/attachments/928503440139771947/930108637681184768/Tbopbh.jpg
```
### System Behavior:
Powershell executing a base64 encoded payload.
DNS request and subsequent file download from cdn.discordapp.com
## Stage 3:
### SHA256: 
```9ef7dbd3da51332a78eff19146d21c82957821e464e8133e9594a07d716d892d```
## Stage 4:
### SHA256:
```34ca75a8c190f20b8a7596afeb255f2228cb2467bd210b2637965b61ac7ea907```
### Unique Strings:
```
cmd.exe /min /C ping 111.111.111.111 -n 5 -w 10 > Nul & Del /f /q "%s"
```
### System Behavior:
Mass file writing and data corruption.
Pinging 111.111.111.111 and then deleting itself.

