# JPMC Task 2
Starter repo for task 2 of JPMC's Forage program

# How to build and test the app

### Explained in plain English (verbose):

This software engineering test has the same problem that most software setups do. Documentation is sparse.

It doesn't explain how to start the server. You have to first start the python server, as they mentioned, but then you have to start the JS server, too. Oh, and the thing that took the most time to figure out = you have to build the JS server first before running it. And you have to install the serve package.

Ideally, as the build instructions do say, you should install nvm and use the right version of node. And then you have to install serve, at which point could can build the React App with your edits. Then you can run the server.

### Explained in code (concise):

```bash
nvm use 18
export NODE_OPTIONS=--openssl-legacy-provider
npm run build
npm install -g serve
python datafeed/server3.py # in another terminal
serve -s build
```