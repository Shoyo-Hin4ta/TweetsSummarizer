# Tweets Summarizer as the name itself is self explanatory XD.

I have built this project using FARM Stack and authentication is done using firebase.

### The flow

User enters the twitter-username and datascrapper gets 5 most recent tweets. The data is passed to LangChain API, where the LLM model summarizes the data and returns a response.
The Langchain integration have been done in javascript.

### Learning

In this project I got to work with Uvicorn which is an ASGI comptaible webserver and FastAPIs which managed the requests. The server and the database were connected using the motor library in python.
And the frontend is build using React, where the user has the liberty to sign up if he wants, if he sign's up. His summarized tweets will be stored in the database and fetched whenever he logs back in.


### Challenges

The main challenges was working with different states, lots of states are being managed. So, got better with the states in react and This is the first project where, I worked with python in the backend, took some documentation
and then it was smooth sailing.




