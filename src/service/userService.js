import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";

//create the connection, specify bluebird as promise

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
  const hashPass = bcrypt.hashSync(userPassword, salt);
  return hashPass;
};

const createNewUser = async (email, password, username) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  const hashUserPassword = hashPassword(password);

  try {
    const [rows, fields] = await connection.execute(
      "INSERT INTO users (email,password,username) VALUES (?, ?, ?)",
      [email, hashUserPassword, username],
    );
  } catch (error) {
    console.log(">>> check error: ", error);
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
    const [rows, fields] = await connection.execute("select * from users");
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
      "DELETE FROM users WHERE id=?",
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
      "SELECT * FROM users WHERE id=?",
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
      "UPDATE users SET email = ?, username = ? WHERE id = ?", // Đã xóa dấu phẩy dư thừa
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
