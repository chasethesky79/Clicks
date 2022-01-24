## NodeJS project that performs calculations on an input json file containing datetime values and returns result set based on specified business rules

1) Package.json - File that contains meta data about project and required dependencies
2) clicks-utils.js : Utility file that contains the core logic to process the input and build result set
3) index.js - Main entry file that will run this node application
4) Implementation Style: Implemented this project using core javascript (ES6) features, ES6 module feature and the moment.js library for datetime calculations.
2) Libraries used : moment.js (for datetime calculations), jest (for unit tests)

# To set up the project by cloning from the repo: (Ensure that NodeJS and npm are installed in the machine)
1) Clone the project to any folder in machine : git clone https://github.com/chasethesky79/Clicks.git -> (If there is a need to clone the repo)
2) Checkout to the feature branch: git checkout clicks_implementation

# To set up the project from the zipped version:
3) Unzip the zipped or compressed version of the project to a folder of your choice.
4) Execute: 'npm run solution' at the root of the project

# To run the project
5) Run - 'npm install' from the root of the project after unzipping or cloning it (and checking out to feature branch) which will install all required dependencies
6) The output of the program is written to a file called - resultset.json in the root of the project.
7) Also everytime the - 'npm run solution' is run, the resultset.json file gets overwritten with the result of the current run / execution.

# To run the unit tests:
Run: 'npm run test' at the root of the project which will run all the jest unit tests and produce console output of the test result. Tests have been added to cover
pretty much all possible positive scenarios and error condition(s).

NOTE: A sample resultset output json file (resultset.json) has been included for reference. 