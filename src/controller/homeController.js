import userService from "../service/userService";

const handleHellowWord = (req, res) => {
  const name = "Huy";
  const age = "22";
  return res.render("home.ejs", { name, age });
};

const handleUserPage = async (req, res) => {
  let userList = await userService.getListUser();
  return res.render("user.ejs", { userList });
};

const handleCreateNewuser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  // const checkPassWord = bcrypt.compareSync(password, hashPassword); // true
  // console.log(">>> Check compareSync: ", checkPassWord);

  userService.createNewUser(email, password, username);

  return res.send("handleCreateNewuser");
};

module.exports = { handleHellowWord, handleUserPage, handleCreateNewuser };
