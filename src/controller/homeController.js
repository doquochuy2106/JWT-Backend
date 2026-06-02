const handleHellowWord = (req, res) => {
  const name = "Huy";
  const age = "22";
  return res.render("home.ejs", { name, age });
};

const handleUserPage = (req, res) => {
  return res.render("user.ejs");
};

module.exports = { handleHellowWord, handleUserPage };
