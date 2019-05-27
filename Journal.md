# Production Journal

5/15/19: Created repo and development branch.  Following [this tutorial][tutorial], ran the following commands to do initial setup:
1. npm --global i create-react-app
2. create-react-app ./
3. npm i --save socket.io
4. npm i --save socket.io-client

5/26/19: The repo has been divided up into three primary branches. Development, this branch, is for cross server-client documentation. The client branch contains the code for the client, and the server branch contains the code for the server. Both have now been updated to be written in typescript. They can now talk to each other and send login messages. The server will remove a client session/player if it disconnects and fails to reconnect and send a message within a specified amount of time. Each branch contains a README file explaining how to set it up.

5/27/19: The README in the development repo will now contain the descriptions for the messages sent between client and server.  Tried to connect with my phone to the client.  It connected but wouldn't do anything when I clicked the begin button.  I found out that the issue was, I needed to change openSocket('http://localhost:7777'); to openSocket('http://<my ip address>:7777');

Of course my phone wasn't on the localhost, I had to go to my comps ip address to get the page.

[tutorial]: https://medium.com/dailyjs/combining-react-with-socket-io-for-real-time-goodness-d26168429a34
