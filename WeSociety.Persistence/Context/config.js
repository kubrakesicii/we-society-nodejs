module.exports = {
    dialect: 'mssql',
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    authentication:{
        options:{
            userName:process.env.DB_USER,
            password:process.env.DB_PASSWORD
        }
    }
};