
module.exports = (sequelize, DataTypes) => {

  const OTP = sequelize.define('OTP', {
    otp_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.STRING, // Assuming user_id is an integer
        allowNull: false
    },
    otp_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    otp_purpose: {
        type: DataTypes.STRING,
        allowNull: false
    },
    otp_expiry_datetime: {
        type: DataTypes.DATE,
        allowNull: false
    }
});
};
    