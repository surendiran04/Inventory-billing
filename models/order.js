
module.exports = (sequelize, DataTypes) => {

const Order = sequelize.define('Order', {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customer_id: {
    type: DataTypes.STRING,
    references: {
      model: "customers",
      key: "customer_id",
    },    
  },
  
  payment_status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending'
  },
  
  
});
return Order; 
};
