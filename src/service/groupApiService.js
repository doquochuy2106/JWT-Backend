const db = require("../../models");

const getGroups = async () => {
  try {
    let group = await db.Group.findAll({
      attributes: ["id", "name", "description"],
      order: [["name", "ASC"]],
    });
    return {
      EM: "Get group success",
      EC: 0,
      DT: group,
    };
  } catch (error) {
    console.log("check error: ", error);
    return {
      EM: "Something Wrong Server!",
      EC: 1,
      DT: [],
    };
  }
};

module.exports = { getGroups };
