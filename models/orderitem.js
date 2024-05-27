module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
  order_item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "orders",
      key: "order_id",
    },
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "products",
      key: "product_id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
});
return OrderItem; 
};
