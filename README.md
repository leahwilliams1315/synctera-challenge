# Synctera Front-End Challenge

### What would be some of the performance considerations for this application with hundreds of users, thousands? millions?

While I don't have a lot of experience scaling applications for very large numbers of users, 
I do know that pagination is an efficient way of reducing the size of the server response. With 
pagination however, you need to consider that filtering and sorting data would need to happen on 
the server as opposed to the client side, and that has its own performance considerations. And on that note,
one of the things I wish I had time to improve is the filtering and sorting that I'm doing on the client side. 

### How would you think about the privacy of the data being explored in this application?
From a front-end perspective, when I think about privacy, I think about ensuring that sensitive data
is not broadcast. Imagining that you were sharing your screen with someone and helping them use a banking
app, it would be important that data like your account number or other sensitive information is obscured.   

### From a security perspective how would you propose to manage the authentication and authorization of the end user for this application?
I haven't had any experience working with authentication for something that needs to be as secure
as a financial application. I think there's an opportunity to implement biometrics as an additional layer 
of authentication, as well as having an auto timed log out or potentially 2FA.   
