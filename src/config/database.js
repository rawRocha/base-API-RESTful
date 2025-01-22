require("dotenv").config();

module.exports = {
  dialect: "mariadb",
  host: process.env.DATABASE_HOST || process.env.DATABASE_HOST_LOCAL,
  port: process.env.DATABASE_PORT,
  username:
    process.env.DATABASE_USERNAME || process.env.DATABASE_USERNAME_LOCAL,
  password:
    process.env.DATABASE_PASSWORD || process.env.DATABASE_PASSWORD_LOCAL,
  database: process.env.DATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  dialectOptions: {
    timezone: "-03:00",
  },
  timezone: "-03:00",
};
