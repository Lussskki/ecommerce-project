const { Sequelize } = require('sequelize')
const signale = require('signale');
const Product = require('./models/product.model');
const User = require('./models/user.model')
const models = [User,Product]

const connection = new Sequelize(
  process.env.DATABASE, 
  process.env.DATABASE_USERNAME, 
  process.env.DATABASE_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres',
      logging: false
    },
  );
  
  (async () => {
    try {
      await connection.authenticate();
      signale.success('DB:Connect: Success ');
    } catch (error) {
      signale.error('DB:Connect: Error :', error);
    }
  })()

  models.map((m) => m.init(connection));


  (async () => {
      await Promise.all(models.map((m) => m.sync({ force: false })));
    })()
  
    module.exports=connection