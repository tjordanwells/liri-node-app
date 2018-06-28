# LIRI CLI

### Summary

Liri is a command line node application that returns releveant data based on the commands that are passed in through the command line.

### Before You Begin

Visit the package.json file and install the npm dependencies to insure that the application will function properly.

**OR**

run these commands after cloning the repo:

npm install dotenv

npm install node-spotify-app

npm install request

npm install require

npm install twitter

### Commands

Each command will start of with the following: 

node liri.js

LIRI will display the last 20 tweets if you command:

node liri.js my-tweets

LIRI will allow you to search spotify for a song if you command: 

node liri.js spotify-this-song "insert song here"

LIRI will allow you to search the OMDB for a movie if you command: 

node liri.js movie-this "insert movie here"

And lastly, LIRI will generate a random response if you command:

node liri.js do-what-it-says

### Enjoy!