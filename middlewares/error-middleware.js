module.exports = (err, req, res, next) => {
	console.log('************')
	if(err.errors) {
		console.log(err.errors)
		return res.status(400).json(err.errors)
	}
	console.log('************')
	console.log(err)
	const statusCode = err.statusCode || 500
	res.status(statusCode).json({error : err.message})
}