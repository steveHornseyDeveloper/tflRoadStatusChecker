const roadStatusChecker = require('../roadStatusChecker')
const tflServices = require('../services/providers/tflServices')

module.exports = (roadName) => {
	return roadStatusChecker({tflServices}, roadName)
}
