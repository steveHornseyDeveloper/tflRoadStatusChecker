const roadStatusChecker = require('../roadStatusChecker')

describe('TFL Services', function () {
	it('getRoadStatus is called', function () {
		let calledFunction = false
		const mockTflServices = {
			getRoadStatus: () => { calledFunction = true }
		}
		roadStatusChecker({ tflServices: mockTflServices }, '')
		expect(calledFunction).toBe(true)
	})

	it('getRoadStatus is called with correct parameter', function () {
		const roadName = 'roadName'
		const mockTflServices = {
			getRoadStatus: (roadName) => {
				expect(roadName).toBe(roadName)
			}
		}
		roadStatusChecker({ tflServices: mockTflServices }, roadName)
	})
})
