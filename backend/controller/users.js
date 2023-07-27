var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { User, Role, UserRoleMapping } = require("../models");
const roleAuthentication = require("../middlewares/role-auth-middleware");
const e = require("express");
require("dotenv").config();

exports.userRegister = async (req, res) => {
  const existingUser = await User.findOne({ where: { email: req.body.email } });
  if (existingUser) {
    res.json({
      success: false,
      message: "User already registered",
    });
  } else {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashPassword });
    const role = await Role.findOne({ where: { code: "USER" } });
    await UserRoleMapping.create({ user_id: user.id, role_id: role.id });

    res.json({
      success: true,
      message: "User Created Successfully",
    });
  }
};

exports.userLogin = async (req, res) => {
  const existingUser = await User.findOne({ where: { email: req.body.email } });

  if (!existingUser) {
    res.json({
      success: false,
      message: "user not registered",
    });
  } else {
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!passwordMatch) {
      res.json({
        success: false,
        message: "Invalid Credential",
      });
    } else {
      const roles = await UserRoleMapping.findAll({
        where: { user_id: existingUser.id },
      });

      const userRoles = [];

      for (const role of roles) {
        const roleEnt = await Role.findOne({
          where: { id: role.role_id },
        });
        userRoles.push(roleEnt.code);
      }

      const token = jwt.sign(
        {
          email: existingUser.email,
          id: existingUser.id,
          name: existingUser.name,
          roles: userRoles,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );

      res.json({
        success: true,
        message: 'You are logged in',
        token,
      });
    }
  }
};

exports.getAllUser = async (req, res) => {
  const allUser = await User.findAll();

  res.json({
    status: true,
    allUser,
  });
};

exports.getUserInfo = async (req, res) => {
  const { id } = req.query;
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ["password"] },
  });

  res.json({
    success: true,
    user,
  });
};

exports.assignUserRole = async (req, res, next) => {
  const existingMapping = await UserRoleMapping.findOne({
    where: {
      user_id: req.body.userId,
      role_id: req.body.roleId,
    },
  });

  if (existingMapping) {
    res.json({
      status: false,
      message: "Role already assigned",
    });
  } else {
    await UserRoleMapping.create({
      user_id: req.body.userId,
      role_id: req.body.roleId,
    });
    res.json({
      status: true,
      message: "Role assigned",
    });
  }
};
