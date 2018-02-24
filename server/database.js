const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAllFavorites = function(callback) {
  connection.query(`SELECT * FROM favorites`, (err,data) => {
  	if(err) console.log(err)
  	callback(data)
  })
  	 
};
const saveFavorite = function(callback) {

  	connection.query(`INSERT INTO favorites (title, rating, releasedate) VALUES (?, ? ,?)`)
};
const deleteFavorites = function(callback) {
  //get favorites from the database
  console.lof()
};
module.exports = connection