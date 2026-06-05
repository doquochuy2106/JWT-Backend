import userService from "../service/userService";

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

  // const checkPassWord = bcrypt.compareSync(password, hashPassword); // true
  // console.log(">>> Check compareSync: ", checkPassWord);

  // userService.createNewUser(email, password, username);
  userService.getListUser();

  return res.send("handleCreateNewuser");
};

module.exports = { handleHellowWord, handleUserPage, handleCreateNewuser };
