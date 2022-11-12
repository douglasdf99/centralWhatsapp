import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.changeColumn("messages", "body", {
      type: DataTypes.TEXT,
      allowNull: true
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.changeColumn("messages", "body", {
      type: DataTypes.STRING,
      allowNull: true
    });
  }
};
