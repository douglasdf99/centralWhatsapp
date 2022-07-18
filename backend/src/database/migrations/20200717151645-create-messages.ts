import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("messages", {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ack: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      mediaType: {
        type: DataTypes.STRING
      },
      mediaUrl: {
        type: DataTypes.STRING
      },
      fromMe:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      ticketId: {
        type: DataTypes.INTEGER,
        references: { model: "tickets", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE(6),
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE(6),
        allowNull: false
      }
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable("messages");
  }
};
