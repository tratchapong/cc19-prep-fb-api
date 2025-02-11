const bcrypt = require('bcryptjs')
const prisma = require('../models')
const tryCatch = require('../utils/tryCatch')
const createError = require('../utils/createError')


function checkEmailorPhone(identity) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const mobileRegex = /^[0-9]{10,15}$/

	let identityKey = ''
	if(mobileRegex.test(identity)) {
		identityKey = 'mobile'
	}
	if(emailRegex.test(identity)) {
		identityKey = 'email'
	}
	if(!identityKey) {
		createError(400, 'only email or phone number')
	}
	return identityKey
}



module.exports.register = tryCatch(async (req,res) => {
	const { identity,firstName, lastName, password, confirmPassword } = req.body
	// validation
	if( !(identity.trim() && firstName.trim() && lastName && password && confirmPassword) ) {
		createError(400, "Please fill all data")
	}

	if(password !== confirmPassword) {
		createError(400,"check confirm Password")
	}
	// check identity is mobile or email
	const identityKey = checkEmailorPhone(identity)

	// check if already email / mobile in User data

	const findIdentity = await prisma.user.findUnique({
		where : { [identityKey] : identity}
	})

	if(findIdentity) {
		createError(409,`Already have this ${identityKey}`)
	}

	// create user in db
	const hashedPassword = await bcrypt.hash(password,10)

	const newUser = {
		[identityKey] : identity,
		password : hashedPassword,
		firstName,
		lastName
	}

	const result = await prisma.user.create({data: newUser})

	res.json({msg: 'Register successful', result})
})


module.exports.login = (req, res) => {
  res.send('Login...')
}
module.exports.getMe = (req, res) => {
  res.send('getMe...')
}

