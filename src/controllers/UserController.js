import User from "../models/User";
import Role from "../models/Role"; // Importando o modelo Role

class UserController {
  // Criar novo usuário
  async store(req, res) {
    try {
      const { role_id } = req.body;

      // Validando o role_id fornecido
      if (role_id) {
        const role = await Role.findByPk(role_id);
        if (!role) {
          return res.status(400).json({ errors: ["Role inválido."] });
        }
      }

      // Criando o usuário
      const newUser = await User.create({
        ...req.body,
        role_id: role_id || 2, // Padrão 2 caso role_id não seja fornecido
      });

      return res.status(201).json({
        message: "Usuário criado com sucesso.",
        data: newUser,
      });
    } catch (e) {
      // Verificando o tipo do erro
      if (e.errors) {
        // SequelizeValidationError ou SequelizeUniqueConstraintError
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }

      console.error(e); // Log do erro para depuração
      return res.status(500).json({
        errors: ["Erro interno do servidor."],
      });
    }
  }

  // Listar todos os usuários
  async index(req, res) {
    try {
      const users = await User.findAll();

      if (!users.length) {
        return res.status(204).json({
          data: null,
        });
      }

      return res.status(200).json(users);
    } catch (e) {
      return res.status(500).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Obter um usuário por ID
  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({
          errors: ["ID Inválido."],
        });
      }

      const user = await User.findByPk(id, {
        include: [
          {
            model: Role, // Incluindo a Role
            as: "role", // Usando o alias configurado
            attributes: ["name"], // Selecionando apenas o campo nome da Role
          },
        ],
      });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      // Verifique se o relacionamento `role` está presente
      if (!user.role) {
        return res
          .status(404)
          .json({ error: "Role não encontrada para este usuário" });
      }

      const userType = user.role.name;

      return res.status(200).json({ user, userType });
    } catch (e) {
      return res.status(500).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Atualizar um usuário
  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({
          errors: ["ID Inválido."],
        });
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          errors: ["Usuário não existe."],
        });
      }

      const { role_id } = req.body;

      // Verificar se role_id é válido antes de atualizar
      if (role_id) {
        const role = await Role.findByPk(role_id);
        if (!role) {
          return res.status(400).json({ errors: ["Role inválido."] });
        }
      }

      // Atualizando o usuário
      const updatedUser = await user.update(req.body);

      return res.status(200).json(updatedUser);
    } catch (e) {
      return res.status(500).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Deletar um usuário
  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({
          errors: ["ID inválido."],
        });
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          errors: ["Usuário não existe."],
        });
      }

      await user.destroy();

      return res.status(200).json({ success: "Usuário removido com sucesso." });
    } catch (e) {
      return res.status(500).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
