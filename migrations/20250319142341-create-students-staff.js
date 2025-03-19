"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("students", {
      studentId: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      userId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      classId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: "classes",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.NOW,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.NOW,
      },
    }),
      await queryInterface.createTable("staff", {
        staffId: {
          type: Sequelize.DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.DataTypes.UUIDV4,
        },
        userId: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        classId: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false,
          references: {
            model: "classes",
            key: "id",
          },
          onDelete: "SET NULL",
        },
        created_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.DataTypes.NOW,
        },
        updated_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.DataTypes.NOW,
        },
      })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("students")
    await queryInterface.dropTable("staff")
  },
}
