const { where } = require("sequelize/lib/sequelize");
const db = require("../../models");
import bcrypt from "bcryptjs";

const checkEmail = async (email) => {
  let isEmail = await db.User.findOne({
    where: {
      email: email,
    },
  });
  if (isEmail) {
    return true;
  }

  return false;
};

const checkPhoneNumber = async (phoneNumber) => {
  let isPhoneNumber = await db.User.findOne({
    where: {
      phone: phoneNumber,
    },
  });
  if (isPhoneNumber) {
    return true;
  }

  return false;
};

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  const hashPass = bcrypt.hashSync(password, salt);
  return hashPass;
};

const handleRegister = async (userData) => {
  try {
    let checkIsEmail = await checkEmail(userData.email);
    if (checkIsEmail) {
      return {
        EM: "Email is already exist!",
        EC: 1,
        DT: "",
      };
    }

    let checkIsPhoneNumber = await checkPhoneNumber(userData.phoneNumber);
    if (checkIsPhoneNumber) {
      return {
        EM: "Phonenumber is already exist!!",
        EC: 1,
        DT: "",
      };
    }

    let hassUserPassword = hashPassword(userData.password);

    let user = await db.User.create({
      email: userData.email,
      password: hassUserPassword,
      phone: userData.phoneNumber,
      username: userData.username,
    });

    return {
      EM: "Create a new user success!",
      EC: 0,
    };
  } catch (error) {
    console.log("check error: ", error);
    return {
      EM: "Something Wrong in server!!",
      EC: 2,
      DT: "",
    };
  }
};

module.exports = {
  handleRegister,
};
