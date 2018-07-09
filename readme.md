## Introduction

A simple NodeJS command line application which checks the status of a road passed to it

## Build

Fill in the config/authConfig file with a appId and an appKey supplied by TFL

The code uses async await  from the ES7 spec, this means a minimum Node version of 7.6 is required. However, I have only verified on the most recent stable version (8.11.2).

## Run
To run the code:
 - CD to directory
 - Ensure NPM has been run
 - Run `node roadStatusApp.js x`
	 - Where x is the name of the road

## Tests
Run `npm test` or `npm run testWatch`   
 
## Code structure
The code has been structured deliberately to mean anything within the src folder is agnostic to how it has been run, and only the file roadStatusApp.js at the root level implements any command line functionality. I did not like the idea of the command line file calling the services directly so I added a wrapping layer ('src/roadStatus.js') which would also be where any business logic for the application would go.
