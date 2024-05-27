module.exports = (sequelize, DataTypes) => {
const Customer = sequelize.define('Customer', {
  customer_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
});
return Customer;
};
