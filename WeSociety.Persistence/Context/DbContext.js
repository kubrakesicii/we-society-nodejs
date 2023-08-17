const tedious = require('tedious');
const { Sequelize } = require('sequelize');
const dbConfig = require('./config');

module.exports = dbContext = {}

const InitializeDbContext = async () => {
    const dialect = 'mssql';
    const host = dbConfig.server;
    const { userName, password } = dbConfig.authentication.options;
    // Connect to db
    const sequelize = new Sequelize(dbConfig.database, userName, password, {host,dialect})

    // Init models and add them to the exported db object
    dbContext.Categories = require('../../WeSociety.Domain/Models/Category.model')(sequelize);

    //Sync all models with db
    await sequelize.sync({})

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

InitializeDbContext()
