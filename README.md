# HandsOnSystemDesign
Hands-on implementations of popular system designs

Studying for the system design interview, I found there are a lot of preparation resources that cover common topics, such as, "Design a URL shortening service." After a while of studying those, I got the itch to start _implementing_ them.  I began to see that the public cloud providers like Amazon offer services like Lambda functions that make implementing some of the common system design interview questions easy.  Moreover, it might be possible to implement some of those systems in such a way that they could scale up to support millions of users.  Of course, one might not have the financial resources to pay the cloud provider for millions of users worth of traffic, but it's nice to know that in theory a design is that robust.

Hence, HandsOnSystemDesign, your one-stop shop for implementations of popular system design examples.  My vision is to offer many variations on common system design subjects.  This repository should have step-by-step instructions for setting up working system design examples on different public cloud providers, as well as on Docker containers.

For now, we ave the good old URL shortenter, implemented on AWS.  Actually, we have just the code for the Lambdas now.  I started this on vacation, and if I don't get off the computer soon, my wife is going to become irritable... I can sense it.  

Please feel free to suggest improvements and additions in pull requests.
