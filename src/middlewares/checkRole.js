export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const { userRole } = req;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        errors: ["Acesso negado. Permissão insuficiente."],
      });
    }

    next();
  };
};
