
async function roadStatusChecker (dependencies, roadName) {
	const { tflServices } = dependencies
	const roadStatus = await tflServices.getRoadStatus(roadName)
	return roadStatus
}

module.exports = roadStatusChecker
