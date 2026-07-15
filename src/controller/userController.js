import userApiService from "../service/userApiService";

const readFunc = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      let data = await userApiService.getUsersWithPaginate(+page, +limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else {
      let data = await userApiService.readFunc();
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (error) {
    console.log("check error: ", error);
    return res.status(500).json({
      EM: "Error from Server!",
      EC: -1,
      DT: "",
    });
  }
};

const deleteFunc = async (req, res) => {
  try {
    let id = req.body.id;
    console.log("check id: ", id);
    let data = await userApiService.deleteUsers(id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("check error: ", error);
    res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const createFunc = async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.phone ||
      !req.body.password ||
      !req.body.group
    ) {
      return res.status(200).json({
        EM: "Missing Require Parameter",
        EC: 1,
        DT: [],
      });
    }

    let data = await userApiService.createUsers(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: [],
    });
  } catch (error) {
    console.log("check error: ", error);
    res.status(500).json({
      EM: "Erorr from Server",
      EC: -1,
      DT: "",
    });
  }
};

const updateFunc = async (req, res) => {
  try {
    let data = await userApiService.updateUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (error) {
    console.log("check error: ", error);
    return res.status(500).json({
      EM: "Eror from Server",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  readFunc,
  deleteFunc,
  createFunc,
  updateFunc,
};
