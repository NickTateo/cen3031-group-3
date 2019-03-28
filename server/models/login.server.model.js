/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create schema */
var loginSchema = new Schema({
	username: {
		type: String, 
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: false
	},
	hash: {
		type: String,
		required: true
	}
	salt: {
		type: String,
		required: true
	}  
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

/*Schema instantiates a Mongoose model */
var Logins = mongoose.model('Listing', tweetSchema);

/* Export the model to make it available to other parts of Node application */
module.exports = Logins;
