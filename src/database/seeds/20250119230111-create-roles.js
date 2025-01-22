"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("roles", [
      {
        name: "admin",
        description: "Administrador do sistema.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "user",
        description: "Usuário comum.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "staff",
        description: "Funcionário do sistema.",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
