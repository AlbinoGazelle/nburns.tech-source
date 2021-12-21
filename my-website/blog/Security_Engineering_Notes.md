---
slug: security_engineering_notes
title: Security Engineering Notes
authors: nathan
tags: [books, engineering, security, notes]
sidebar_position: 1
---

This is a collection of my notes while reading "Security Engineering: A Guide To Building Dependable Distributed Systems" by Ross Anderson.  
Ill drop interesting quotes and my thoughts about topics here, eventually I plan on making a more comprehensive post after I'm done with the book.

<!--truncate-->

"To build dependable systems you need four things. There's policy: what you're supposed to achieve. There's mechanism: the ciphers, access controls, hardware tamper-resistance and other machinery that you use to implement the policy. There's assurance: the amount of reliance you can place on each particular mechanism, and how well they work together. Finally, there's incentive: the motive that the people guarding and maintaining the system have to do their job properly, and also the motive that the attackers have to try to defeat your policy." Page 4

"The result is what Bruce Schneier calls ‘security theatre’ – measures designed to produce a feeling of security rather than the reality." on why policy makes favor visible controls over effective ones. Huge example is the ineffectiveness of TSA. Over 50% of dangerous items are not caught, whereas the $100 million to install secure cockpit doors did more to secure the skies. Page 4

"Ignoring the human components, and thus neglecting usability issues, is one of the largest causes of security failure."  Page 5

"I use the NSA definition that a trusted system or component is one whose failure can break the security policy, while a trustworthy system or component is one that won't fail."  Page 6

"Typically, privacy is secrecy for the benefit of the individual while confidentiality is secrecy for the benefit of the organisation" Page 14  

"Online crime now makes up about half of all crime, by volume and by value" Page 18. Useful quote when talking to non-technical folks on the sheer volume of internet related crimes.  

"There's a collection of decks on Xkeyscore with a survey by Morgan Marquis-Boire, Glenn Greenwalk and Micah Lee. A careful reading of the decks can be a good starting point for exploring the Snowden hoard" Page 24. Since I was just 15 when the Snowden leaks came out, I missed the importance of them. Interested in reading through them now that I'm an adult and in the industry.  

"Given that these institutions make many of the laws for the UK and other member states, this was almost as if a US state governor had got his state troopers to hack AT&T so he could wiretap Congress and the White House." Page 25. On the topic of the GCHQ hacking another NATO member state's telecom services.  

"Agencies frequently target admins of phone companies and ISPs in the Middle East, Africa, and indeed worldwide - compromising a key technician is 'generally the entry ticket to the network'". Page 26. Last bit of that is really important on the subject of training every member of an organization on cyber security.  

"The Vault 7 documents are useful reading if you're curious about the specifications and manuals for modern government malware." Page 26  

"The following year, after the outbreak of a brief war between Russia and Georgia, Russian hackers set up a website with a list of targets in Georgia for Russian patriots to attack." Page 35  

"The world's law-enforcement agencies typically spend less than one percent of their budgets on fighting it [online crime]" Page 40  

"a combination of credit card number and expiry date sells for under a dollar" Page 46  

"CrimeBB a database we've assembled of tens of millions of posts in underground hacker forums..." Page 46. Interesting database to look at if I have time. (and if they allow me)  

"As with the criminal infrastructure, the total costs may be easily two orders of magnitube greater than anything the criminals get away with" Page 48  

"The most notorious forensic failure was Britain's Operation Ore, which I describe in more detail in 26.5.3. Briefly, several thousand men were arrested on suspicion of CSA offences after their credit card numbers were found on an abuse website, and perhaps half of them turned out to be victims of credit card fraud. Hundreds of innocent men had their lives ruined." Page 55  

"This is based on face-to-face interviews with 16,000 households and the 2017 survey reported two million cases of threatening behaviour, 7% were made on social networks and a further 9% by phone. But have social media made this worse? Research suggests that the effects of social media use on adolescent well-being are nuanced, small at best, and contingent on analytic methods." Page 56. Good point to bring up when older generations blame social media for everything.  

"Yet there is talk in the media of a rise in teen suicide which some commentators link to social media use. Thankfully, the OECD mortality statistics show that this is also untrue: suicides among 15–19 year olds have declined slightly from about 8 to 7 cases per 100,000 over the period of 1990-2015" Page 55-56. Interesting talking point when older generations say social media is the cause of teen sucicide.  

"The problems faced by a woman leaving an abusive and controlling husband are among the hardest in the universe of information security." Page 58. As tech becomes more ingrained into everyones lives, we as an industry and community must focus more on how tech and the security of said tech impacts personal relations and enables abuse.  

"The systems you build or operate can be attacked by a wide range of opponents. It's important to work out who might attack you and how, and it's also important to be able to figure out how you were attacked and by whom. Your systems can also be used to attack others, and if you don't think about this in advance you may find yourself in serious legal or political trouble." Page 58  

"Personal abuse matters too. Every police officer knows that the person who assaults you or murders you isn't usually a stranger, but someone you know – maybe another boy in your school class, or your stepfather. This has been ignored by the security research community, perhaps because we're mostly clever white or Asian boys from stable families in good neighbourhoods." Page 59  

"Only amateurs attack machines; professionals target people" Page 63. By far my favorite quote in the entire book and cybersecurity in general. Need to focus on training instead of $$$$$$ on firewalls and "quantum" AV hogwash.  

"It's much easier for crooks to create a bogus bank website that passes casual inspection than to build an actual bogus bank branch in a shopping street." Page 63. Could be an interesting topic for another blog post.  

"We've evolved social and psychological tools over millions of years to help us deal with deception in face-to-face contexts, but these are less effective when we get an email that asks us to do something. For an ideal technology, good use would be easier than bad use. We have many examples in the physical world: a potato peeler is easier to use for peeling potatoes than a knife is, but a lot harder to use for murder. But we've not always got this right for computer systems yet. Much of the asymmetry between good and bad on which we rely in our daily business doesn't just depend on formal exchanges" Page 63. Huge quote on why we are so vulnerable to social engineering. Another quote for the basis of another blog post.  

"Deception, of various kinds, is now the principal mechanism used to defeat online security." Page 64  