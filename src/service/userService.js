import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../../models";

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
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute("select * from user");
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const handleDeleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute(
      "DELETE FROM user WHERE id=?",
      [id],
    );
    return rows;
  } catch (error) {
    console.log(">> check error: ", error);
  }
};

const getUSerByid = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute(
      "SELECT * FROM user WHERE id=?",
      [id],
    );
    return rows;
  } catch (error) {
    console.log("check error: ", error);
  }
};

const handleUpdateUser = async (id, email, username) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute(
      "UPDATE user SET email = ?, username = ? WHERE id = ?", // Đã xóa dấu phẩy dư thừa
      [email, username, id],
    );
    return rows;
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
