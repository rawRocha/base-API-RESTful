import Sequelize, { Model } from "sequelize";

export default class Role extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: "",
          unique: {
            msg: "Esse nome de função já está em uso.",
          },
          validate: {
            len: {
              args: [3, 255],
              msg: "Campo nome deve ter entre 3 e 255 caracteres.",
            },
          },
        },
        description: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [0, 255],
              msg: "Campo descrição deve ter até 255 caracteres.",
            },
          },
        },
      },
      {
        sequelize,
        modelName: "Role",
        tableName: "roles",
      },
    );

    return this;
  }

  static associate(models) {
    // Relacionamento entre Role e User
    this.hasMany(models.User, {
      foreignKey: "role_id",
      as: "users", // Alias para o relacionamento inverso
    });
  }
}
