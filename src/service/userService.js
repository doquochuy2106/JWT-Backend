import bcrypt from "bcryptjs";
import mysql from "mysql2";

const salt = bcrypt.genSaltSync(10);

//crete the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});

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

const getListUser = () => {
  let users = [];
  connection.query("SELECT * FROM users ", function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log(">>> Check result: ", results);
  });
};

module.exports = {
  createNewUser,
  getListUser,
};
