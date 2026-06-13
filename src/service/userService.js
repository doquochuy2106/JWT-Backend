import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../../models";
import { where } from "sequelize/lib/sequelize";

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
