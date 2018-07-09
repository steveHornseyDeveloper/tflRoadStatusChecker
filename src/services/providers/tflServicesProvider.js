const fetch = require('node-fetch')
const authenticationParams = require('../../../config/authConfig')
const apiConfig = require('../../../config/apiConfig')
const tflServices = require('../tflServices')

module.exports.getRoadStatus = (roadName) => {
	return tflServices.getRoadStatus({fetch, authenticationParams, apiConfig}, roadName)
}
