import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("whatsapps", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      session: {
        type: DataTypes.STRING
      },
      qrcode: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING
      },
      battery: {
        type: DataTypes.STRING
      },
      plugged: {
        type: DataTypes.BOOLEAN
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      default: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable("whatsapps");
  }
};
