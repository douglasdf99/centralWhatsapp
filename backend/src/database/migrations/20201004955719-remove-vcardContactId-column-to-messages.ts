import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.removeColumn("messages", "vcardContactId");
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.addColumn("messages", "vcardContactId", {
      type: DataTypes.INTEGER,
      references: { model: "contacts", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
  }
};
