# jchart README.md
1/3/17 -br

## What is it?

This is an early prototype of a real-time visualization tool
for social network data.

## Setup

1. Install node.js and npm

    Download and install procedure at http://nodejs.org

2. In a terminal window, download the software

    git clone https://github.com/billroy/jchart

3. Continuing in Terminal, install the dependencies:

    cd jchart
    npm install

## Running jchart

1. In a Terminal window, run jchart.js

    cd jchart
    node jchart.js

    (When you're done you can stop the program with Control-C)

2. Open a browser to see the application
    Open a browser to http://localhost:3000
    You should see the application start up with a blank chart

## Testing jchart

There is a simple python program that demonstrates posting a chart request
with randomized data to the server; run it a few times in a new terminal window with your eye on the browser window
to see how it works:

    cd jchart
    python test.py


## Command Line Options

### --port=3000

Sets the http port for the jchart server.

### --logfile=none

Sets the log file name.
