## Build

As the project contains a dependency for node-fetch please run an NPM install. All other dependencies are dev dendencies (ES-Lint).

There is a folder for config at the root level of the site, inside is an apiConfig module for a TFL App_Id & the App_key.

The code uses async await  from the ES7 spec, this means a minimum Node version of 7.6 is required. I however  have only verified on the most recent stable version (8.11.2).

Run `node -v` to find our your node version.
The latest version is available from https://nodejs.org/en/

## Run
To run the code:
 - CD to directory
 - Ensure NPM has been run
 - Run `node roadStatusApp.js x`
	 - Where x is the name of the road

## Tests
Run the standard `npm test` or `npm run testWatch`

## Assumptions
I kept the inputs and the outputs of the program similar to the example shown in the Word document. However, Node.js handles arguments is slightly different to .NET. An array is passed into the process through the globally scoped process.argv. The first two entities are the location of where Node is installed, and the location of the file which was ran. I therefore I assume that the 3rd input will always be the road name. This is slightly messy and as I suggested in a comment my preferred option would be either using the Readline functionality built into Node, or specifying 'roadname=x' and then do a find and then substring on the process.argsv array for the string 'roadname='.   
 
## Code structure
The code has been structured deliberately to mean anything within the src folder is agnostic to how it has been run, and only the file roadStatusApp.js at the root level implements any command line functionality. I did not like the idea of the command line file calling the services directly so I added a wrapping layer ('src/roadStatus.js') which would also be where any business logic for the application would go.
