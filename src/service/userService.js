import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../../models";
import { where } from "sequelize/lib/sequelize";
import { raw } from "body-parser";

//create the connection, specify bluebird as promise

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
  const hashPass = bcrypt.hashSync(userPassword, salt);
  return hashPass;
};

const createNewUser = async (email, password, username) => {
  const hashUserPassword = hashPassword(password);

  try {
    await db.User.create({
      email: email,
      password: hashUserPassword,
      username: username,
    });
  } catch (error) {
    console.log("check error: ", error);
  }
};

const getListUser = async () => {
  //test relationship
  let newUser = await db.User.findOne({
    where: { id: 1 },
    attributes: ["id", "email", "username"],
    include: { model: db.Group, attributes: ["id", "name", "description"] },
    raw: true,
    nest: true,
  });

  let roles = await db.Role.findAll({
    attributes: ["id", "url", "description"],
    include: {
      model: db.Group,
      where: { id: 1 },
      attributes: ["id", "name", "description"],
    },
    raw: true,
    nest: true,
  });

  let user = [];
  try {
    user = await db.User.findAll();
    return user;
  } catch (error) {
    console.log("check error: ", error);
  }
};

const handleDeleteUser = async (id) => {
  try {
    await db.User.destroy({
      where: { id: id },
    });
  } catch (error) {
    console.log("check error: ", error);
  }
};

const getUSerByid = async (id) => {
  let user = {};
  try {
    user = await db.User.findOne({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error) {
    console.log("check error: ", error);
  }
};

const handleUpdateUser = async (id, email, username) => {
  try {
    await db.User.update(
      {
        email: email,
        username: username,
      },
      {
        where: {
          id: id,
        },
      },
    );
  } catch (error) {
    console.log("check error: ", error);
  }
};

module.exports = {
  createNewUser,
  getListUser,
  handleDeleteUser,
  getUSerByid,
  handleUpdateUser,
};
