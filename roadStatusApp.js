const roadStatusChecker = require('./src/providers/roadStatusChecker')

const args = process.argv
runApplication(args)

async function runApplication (args) {
	try {
		const roadName = getRoadNameFromArgs(args)
		const status = await roadStatusChecker(roadName)
		logRoadStatus(status)
	} catch (error) {
		console.error(error.message)
		process.exit(1)
	}
}

function getRoadNameFromArgs (args) {
	// Chose to do this way to match up with the example given
	// Potentially better ways would be readline or road=____ to ensure correct param is assingned to road
	const roadName = args[2]

	if (!roadName) {
		throw new Error('Road name not specified in args')
	}
	return roadName
}

function logRoadStatus (roadStatus) {
	console.log(`The status of the ${roadStatus.displayName} is as follows:`)
	console.log(`Road Status is ${roadStatus.statusSeverity}`)
	console.log(`Road Status Description is ${roadStatus.statusSeverityDescription}`)
}
