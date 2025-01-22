import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import User from "../models/User";
import Role from "../models/Role";

const models = [User, Role];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));

models.forEach((model) => {
  if (model.associate) {
    model.associate(connection.models);
  }
});
