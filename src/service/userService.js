import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";

//create the connection, specify bluebird as promise

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
  const hashPass = bcrypt.hashSync(userPassword, salt);
  return hashPass;
};

const createNewUser = (email, password, username) => {
  const hashUserPassword = hashPassword(password);

  connection.query(
    "INSERT INTO users (email,password,username) VALUES (?, ?, ?)",
    [email, hashUserPassword, username],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    },
  );
};

const getListUser = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  let users = [];
  // connection.query("SELECT * FROM users ", function (err, results, fields) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(">>> Check result: ", results);
  // });
  try {
    const [rows, fields] = await connection.execute("select * from users");
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewUser,
  getListUser,
};
