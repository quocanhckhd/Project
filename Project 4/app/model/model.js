module.exports = (sequelize, Sequelize) => {
	const Data = sequelize.define('data', {
	  title: {
		type: Sequelize.STRING
	  },
	  url: {
		type: Sequelize.STRING
	  },
	  content: {
		  type: Sequelize.STRING
	  },
	  time: {
	  	type: Sequelize.STRING
	  }
	});
	
	return Data;
}