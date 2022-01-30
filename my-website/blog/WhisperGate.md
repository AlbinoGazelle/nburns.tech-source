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



# IOCs
## Stage 1:
SHA256: a196c6b8ffcb97ffb276d04f354696e2391311db3841ae16c8c9f56f36a38e92
Strings: 

## Stage 2:
SHA256: dcbbae5a1c61dbbbb7dcd6dc5dd1eb1169f5329958d38b58c3fd9384081c9b78
## Stage 3:
SHA256: 9ef7dbd3da51332a78eff19146d21c82957821e464e8133e9594a07d716d892d
## Stage 4:
SHA256: 34ca75a8c190f20b8a7596afeb255f2228cb2467bd210b2637965b61ac7ea907
