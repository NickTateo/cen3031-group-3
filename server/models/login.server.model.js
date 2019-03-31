/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;
var crypto = require('crypto');
//var jwt = require('jsonwebtoken');

/* Create schema */
var loginSchema = new Schema({
	username: {
		type: String, 
		required: true,
		unique: true
	},
	/*name: {
		type: String,
		required: false
	},*/
	hash: {
		type: String,
		required: true
	}
	/*
	salt: {
		type: String,
		required: true
	}
	*/
	created_at: {
		type: Date,
		required: true
	},
	updated_at: Date
});

/*'pre' function that adds the updated_at (and created_at if not already there) property */
loginSchema.pre('save', function(next) {
	var currentTime = new Date;
	this.updated_at = currentTime;
	if(!this.created_at)
	{
		this.created_at = currentTime;
	}
	next();
});

//TODO

loginSchema.methods.savePassword = function(password) {
	this.salt = crypto.randomBytes().toString(16);
	
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString(16);
};

/*
loginSchema.methods.validatePassword = function(password) {
	vHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString(16);
	return this.hash === vHash;
};

loginSchema.methods.generateToken = function() {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 1);

	return jwt.sign({
		_id: this._id,
		username: this.username,
		name: this.name,
		exp: parseInt(expiry.getTime() / 1000),
	}, "MY_SECRET");
	
	// MY_SECRET is the private key for the sign function 
	// this whe can generate by other means too
	/// TODO generate Private key 	
	
};
*/

/*Schema instantiates a Mongoose model */
var Logins = mongoose.model('Logins', loginSchema);

/* Export the model to make it available to other parts of Node application */
module.exports = Logins;
