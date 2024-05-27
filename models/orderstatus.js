module.exports = (sequelize, DataTypes) => {
  const OrderStatus = sequelize.define('OrderStatus', {
  order_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "orders",
      key: "order_id",
    },    

  },
  status_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
return OrderStatus;
};




