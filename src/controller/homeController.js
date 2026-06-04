import mysql from "mysql2";

//crete the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});

const handleHellowWord = (req, res) => {
  const name = "Huy";
  const age = "22";
  return res.render("home.ejs", { name, age });
};

const handleUserPage = (req, res) => {
  return res.render("user.ejs");
};

const handleCreateNewuser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  connection.query(
    "INSERT INTO users (email,password,username) VALUES (?, ?, ?)",
    [email, password, username],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    },
  );
  return res.send("handleCreateNewuser");
};

module.exports = { handleHellowWord, handleUserPage, handleCreateNewuser };
