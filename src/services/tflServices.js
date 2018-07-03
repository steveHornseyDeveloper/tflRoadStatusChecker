const { Road } = require('../models/road')

module.exports.getRoadStatus = async (dependencies, roadName) => {
	const {fetch, authenticationParams, apiConfig} = dependencies

	const baseUrl = apiConfig.tflUrl
	const authenticationString = generateAuthenticationString(authenticationParams)
	const response = await fetch(`${baseUrl}/road/${roadName}?${authenticationString}`)

	const status = response.status
	const json = await response.json()

	if (status === 200) {
		return new Road(json[0])
	} else {
		return handleError(json, roadName)
	}
}

function generateAuthenticationString ({applicationId, applicationKey}) {
	return `app_id=${applicationId}&app_key=${applicationKey}`
}

function handleError (json, roadName) {
	if (json.httpStatusCode === 404) {
		const errorMessage = `${roadName} is not a valid road`
		throw new Error(errorMessage)
	}

	if (json.httpStatusCode !== 200) {
		const errorMessage = json.message
		throw new Error(errorMessage)
	}
}
