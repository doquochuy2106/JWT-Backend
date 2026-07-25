import LoginRegisterService from "../service/LoginRegisterService";

const testApi = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "test-api",
  });
};

const handleRegister = async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.phoneNumber ||
      !req.body.username ||
      !req.body.password
    ) {
      return res.status(200).json({
        EM: "Missing required parameter",
        EC: 1,
        DT: "",
      });
    }

    if (req.body.password && req.body.password.length < 4) {
      return res.status(200).json({
        EM: "Yout password mush have more 4 letters",
        EC: 1,
        DT: "",
      });
    }

    let data = await LoginRegisterService.handleRegister(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
    });
  } catch (error) {
    console.log("check error: ", error);
    return res.status(500).json({
      EM: "Error from server!",
      EC: -1,
      DT: "",
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    if (!req.body.valueLogin || !req.body.password) {
      return res.status(200).json({
        EM: "Missing rquired parameter!",
        EC: 1,
        DT: "",
      });
    }

    let data = await LoginRegisterService.handleLogin(req.body);

    //set cookies
    if (data && data.DT && data.DT.access_token) {
      res.cookie("JWT", data.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("check error: ", error);
    return res.status(500).json({
      EM: "Error from server!",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  testApi,
  handleRegister,
  handleLogin,
};
