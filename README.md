## NodeJS project that performs calculations on an input json file containing datetime values and returns result set based on specified business rules

1) Package.json - File that contains meta data about project and required dependencies
2) clicks-utils.js : Utility file that contains the core logic to process the input and build result set
3) index.js - Main entry file that will run this node application
4) Implementation Style: Implemented this project using core javascript (ES6) features, ES6 module feature and the moment.js library for datetime calculations.
2) Library used : Used the moment.js library for dates since it provides many convenient methods to manipulate and perform computations on dates.

# To run the project: (Ensure that NodeJS and npm are installed in the machine)
1) Clone the project to any folder in machine : git clone https://github.com/chasethesky79/Clicks.git
2) Checkout to the feature branch: git checkout clicks_implementation
3) Execute: 'npm run solution' at the root of the project

# To run the unit tests:
Execute: 'npm run test' at the root of the project

NOTE: A sample resultset output json file (resultset.json) has been included for reference. However everytime the - 'npm run solution' is run, this file get overwritten with the result of the current run / execution.
