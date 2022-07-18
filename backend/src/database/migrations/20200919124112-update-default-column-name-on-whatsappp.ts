import { QueryInterface } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.renameColumn("whatsapps", "default", "isDefault");
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.renameColumn("whatsapps", "isDefault", "default");
  }
};
