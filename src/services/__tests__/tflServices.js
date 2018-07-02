const {getRoadStatus} = require('../tflServices')

describe.only('TFL Services', function () {
	const fakeAuthenticationParams = {
		applicationId: '123',
		applicationKey: 'ABC'
	}

	const fakeApiConfig = {
		tflUrl: 'https.theTflServer.com'
	}

	it('has correct base url', function (done) {
		const fakeFetch = (url) => new Promise(() => {
			const baseUrlCorrect = url.includes(fakeApiConfig.tflUrl)
			expect(baseUrlCorrect).toBe(true)
			done()
		})

		return getRoadStatus({fetch: fakeFetch, authenticationParams: fakeAuthenticationParams, apiConfig: fakeApiConfig}, undefined)
	})

	it('uses parameter name', function (done) {
		const roadNameParam = 'roadName'
		const fakeFetch = (url) => new Promise(() => {
			const roadNameIncluded = url.includes(roadNameParam)
			expect(roadNameIncluded).toBe(true)
			done()
		})

		return getRoadStatus({fetch: fakeFetch, authenticationParams: fakeAuthenticationParams, apiConfig: fakeApiConfig}, roadNameParam)
	})

	it('generates an authentication query string', function (done) {
		const fakeFetch = (url) => new Promise(() => {
			const applicationIdIncluded = url.includes(fakeAuthenticationParams.applicationId)
			const applicationKeyIncluded = url.includes(fakeAuthenticationParams.applicationKey)
			expect(applicationIdIncluded).toBe(true)
			expect(applicationKeyIncluded).toBe(true)
			done()
		})

		return getRoadStatus({fetch: fakeFetch, authenticationParams: fakeAuthenticationParams, apiConfig: fakeApiConfig}, '')
	})

	it('parses a road from correct format and all fields populated', async function (done) {
		const fakeFetch = () => Promise.resolve({
			status: 200,
			json: () => Promise.resolve([
				{
					id: 'roadId',
					displayName: 'roadName',
					statusSeverity: 'Good',
					statusSeverityDescription: 'No exceptional delays'
				}
			])
		})

		var response = await getRoadStatus({fetch: fakeFetch, authenticationParams: fakeAuthenticationParams, apiConfig: fakeApiConfig}, '')

		expect(response.id).toBeDefined()
		expect(response.displayName).toBeDefined()
		expect(response.statusSeverity).toBeDefined()
		expect(response.statusSeverityDescription).toBeDefined()
		done()
	})

	it('throws an error when 404 status code returned', async function (done) {
		const roadName = 'roadName'
		let thrownError = false
		const fakeFetch = () => Promise.resolve({
			status: 404,
			json: () => Promise.resolve({
				httpStatusCode: 404,
				httpStatus: 'Not found'
			})
		})

		try {
			await getRoadStatus({fetch: fakeFetch, authenticationParams: fakeAuthenticationParams, apiConfig: fakeApiConfig}, roadName)
		} catch (ex) {
			expect(ex.message).toBe(`${roadName} is not a valid road`)
			thrownError = true
		}

		expect(thrownError).toBe(true)
		done()
	})

	it('throws an error with HTTP message when non 200 status code returned', async function (done) {
		const httpMessage = 'An error occured'
		let thrownError = false
		const fakeFetch = () => Promise.resolve({
			status: 999,
			json: () => Promise.resolve({
				httpStatusCode: 999,
				httpStatus: 'Not found',
				message: httpMessage
			})
		})

		try {
			await getRoadStatus({fetch: fakeFetch, authenticationParams: fakeAuthenticationParams, apiConfig: fakeApiConfig}, '')
		} catch (ex) {
			expect(ex.message).toBe(httpMessage)
			thrownError = true
		}

		expect(thrownError).toBe(true)
		done()
	})
})
