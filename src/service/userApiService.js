const db = require("../../models");
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
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
      attributes: [
        "id",
        "email",
        "password",
        "username",
        "address",
        "sex",
        "phone",
      ],
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      order: [["id", "DESC"]],
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

const deleteUsers = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    });
    if (user) {
      await user.destroy();
      return {
        EM: "Delete User Success !",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "User Not Esixt!",
        EC: 1,
        DT: [],
      };
    }
  } catch (error) {
    console.log("check error: ", error);
    return {
      EM: "Something Wrong server",
      EC: 1,
      DT: "",
    };
  }
};

const checkEmail = async (email) => {
  let emailUser = await db.User.findOne({
    where: { email: email },
  });
  if (emailUser) {
    return true;
  }
  return false;
};

const checkPhoneNumber = async (phoneNumber) => {
  let phone = await db.User.findOne({
    where: { phone: phoneNumber },
  });
  if (phone) {
    return true;
  }
  return false;
};

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  let hassUserPassword = bcrypt.hashSync(password, salt);
  return hassUserPassword;
};

const createUsers = async (userData) => {
  try {
    let checkUserEmail = await checkEmail(userData.email);
    if (checkUserEmail) {
      return {
        EM: "Email is already Esixt",
        EC: 1,
        DT: "email",
      };
    }

    let checkUserPhone = await checkPhoneNumber(userData.phone);
    if (checkUserPhone) {
      return {
        EM: "Phone is already Esixt",
        EC: 1,
        DT: "phone",
      };
    }

    let hashPasswordUser = hashPassword(userData.password);

    let user = await db.User.create({
      email: userData.email,
      password: hashPasswordUser,
      phone: userData.phone,
      username: userData.username,
      address: userData.address,
      sex: userData.sex,
      groupId: userData.group,
    });

    return {
      EM: "Create a new User success",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log("chekc error: ", error);
    return {
      EM: "Somethign Wrong Server",
      EC: 1,
      DT: [],
    };
  }
};

const updateUser = async (userData) => {
  try {
    if (!userData.group) {
      return {
        EM: "Empty Group !",
        EC: 1,
        DT: "group",
      };
    }
    let user = await db.User.findOne({
      where: { id: userData.id },
    });
    if (user) {
      await user.update({
        username: userData.username,
        address: userData.address,
        sex: userData.sex,
        groupId: userData.group,
      });
      return {
        EM: "Update User Success!",
        EC: 0,
        DT: "",
      };
    } else {
      return {
        EM: "Not found User",
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    console.log("check error: ", error);
    return {
      EM: "Somethign wrong server",
      EC: 1,
      DT: "",
    };
  }
};

module.exports = {
  readFunc,
  getUsersWithPaginate,
  deleteUsers,
  createUsers,
  updateUser,
};
