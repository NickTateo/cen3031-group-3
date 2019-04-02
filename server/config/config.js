//This file holds any configuration variables we may need 
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
	//user below has read-only access
	//does comma at end make difference?
	//uri: 'mongodb://reader_user:r34der_user@ds133275.mlab.com:33275/cen3031',
	  
    //user below has read and write access
	uri: 'mongodb://bootcamp_root:bootcamp_pwd0@ds133275.mlab.com:33275/cen3031', //place the URI of your mongo database here.
  }, 
  port: (process.env.PORT || 8080)
};