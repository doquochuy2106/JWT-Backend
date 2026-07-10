const db = require("../../models");

const readFunc = async () => {
  try {
    let user = await db.User.findAll({
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      attributes: [
        "id",
        "email",
        "password",
        "username",
        "address",
        "sex",
        "phone",
      ],
      nest: true,
      raw: true,
    });
    if (user) {
      return {
        EM: "GetAll Users Success!",
        EC: 0,
        DT: user,
      };
    } else {
      return {
        EM: "GetAll Users Success!",
        EC: 1,
        DT: [],
      };
    }
  } catch (error) {
    console.log(">>> check error: ", error);
    return {
      EM: "Somethign Wrong Server!",
      EC: 2,
      DT: [],
    };
  }
};

const getUsersWithPaginate = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;

    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
    });

    let totalPage = Math.ceil(count / limit);
    let data = {
      totalCount: count,
      totalPage: totalPage,
      users: rows,
    };

    return {
      EM: "Get USer with Pagination Succsess!",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log("check error: ", error);
    return {
      EM: "Something Wrong Server!",
      EC: 2,
      DT: [],
    };
  }
};

module.exports = {
  readFunc,
  getUsersWithPaginate,
};
