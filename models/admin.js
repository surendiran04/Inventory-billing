module.exports = (sequelize, DataTypes) => {

const Admin = sequelize.define('Admin', {
  email: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    
  },
  
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
return Admin;
};


