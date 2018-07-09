const roadStatusChecker = require('../roadStatusChecker')
const tflServices = require('../services/providers/tflServicesProvider')

module.exports = (roadName) => {
	return roadStatusChecker({tflServices}, roadName)
}
