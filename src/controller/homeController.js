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

const handleCreateNewuser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  await userService.createNewUser(email, password, username);

  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  let id = req.params.id;
  await userService.handleDeleteUser(id);
  return res.redirect("/user");
};

const getUSerByid = async (req, res) => {
  let id = req.params.id;

  let user = await userService.getUSerByid(id);
  let userData = {};
  if (user && user.length > 0) {
    userData = user[0];
  }
  return res.render("user-update.ejs", { userData });
};

const handleUpdateUser = async (req, res) => {
  let id = req.body.id;
  let email = req.body.email;
  let username = req.body.username;

  await userService.handleUpdateUser(id, email, username);
  return res.redirect("/user");
};

module.exports = {
  handleHellowWord,
  handleUserPage,
  handleCreateNewuser,
  handleDeleteUser,
  getUSerByid,
  handleUpdateUser,
};
