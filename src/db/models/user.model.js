const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(connection) {
    super.init({
      firstName: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      isAdmin: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      deletedAt: {
        type: DataTypes.TIME,
        allowNull: true,
      },
    },
      {
        sequelize: connection,
        tableName: 'users',
        timestamps: true,
        updatedAt: false
      }
    );
  }
}

module.exports = User;