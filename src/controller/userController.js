import userApiService from "../service/userApiService";

const readFunc = async (req, res) => {
  try {
    let data = await userApiService.readFunc();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("check error: ", error);
    return res.status(500).json({
      EM: "Error from Server!",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  readFunc,
};
