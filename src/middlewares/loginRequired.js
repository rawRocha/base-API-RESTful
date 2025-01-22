import jwt from "jsonwebtoken";
import User from "../models/User";

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ["Login required"],
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);

    const { id, role_id, email } = dados;
    req.userId = id;
    req.userRole = role_id;
    req.userEmail = email;

    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    console.log(user);

    if (!user) {
      return res.status(401).json({
        errors: ["Usuário inválido"],
      });
    }

    console.log(id, role_id, email);
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      errors: ["Token expirado ou inválido."],
    });
  }

  next();
};
