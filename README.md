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

For more points, run "testbig.py"


## Command Line Options

### --port=3000

Sets the http port for the jchart server.

### --logfile=none

Sets the log file name.

## Integration

### How and where to post

To generate a chart, POST an object of the following form, in JSON format,
to http://localhost:3000/xychart.  Be sure to specify the content type header
like this: "Content-type: application/json".

### JSON POST data format

Here is the general form of a chart request object:

    {
        title: "Sample data from test.py",
        banner: "job: joel26 iteration: 34 chi^2: 345.7",
        points: [
            {name: "alice", x: 100, y: 200, z: 300, color: "red"},
            {name: "bob", x: 200, y: 100, z: 300, color: "blue"},
            {name: "charlie", x: 400, y: 200, z: 300, color: "green"}
        ],
        connections: [[0,1],[0,2],[1,2]]
    }

The title is displayed by the chart module.

The banner is displayed in the web interface above the plot area; use it for
metadata about the plot.

Coordinates in the 'points' array should be in [-1000, 1000].

The connections array is optional.  If specified, it contains pairs of points
to connect with lines in the visualization.  A point is specified as 0-relative
index into the points array, so [0,1] means "connect Alice and Bob" in this
example.
