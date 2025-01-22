import Sequelize, { Model } from "sequelize";
import bcryptjs from "bcryptjs";
import Role from "./Role.js";

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Campo nome deve ter entre 3 e 255 caracteres.",
            },
          },
        },
        lastname: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Campo sobrenome deve ter entre 3 e 255 caracteres.",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: "",
          unique: {
            msg: "E-mail já cadastrado.",
          },
          validate: {
            isEmail: {
              msg: "E-mail inválido.",
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: "",
          validate: {
            len: {
              args: [6, 50],
              msg: "Senha deve ter entre 6 e 50 caracteres.",
            },
          },
        },
        phone: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
        role_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 2, // Valor padrão para role_id
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
      },
    );

    this.addHook("beforeSave", async (user) => {
      user.password_hash = await bcryptjs.hash(user.password, 8);
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  static associate(models) {
    // Relacionamento entre User e Role
    this.belongsTo(models.Role, {
      foreignKey: "role_id",
      as: "role", // Alias para o relacionamento
    });
  }
}
