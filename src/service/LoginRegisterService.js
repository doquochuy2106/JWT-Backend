const { where } = require("sequelize/lib/sequelize");
const db = require("../../models");
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { getGroupsWithRoles } from "./JWTService";

import { createJWT } from "../middleware/JWTAction";
require("dotenv").config();

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

const checkPassword = (inputPassword, hasPassword) => {
  return bcrypt.compareSync(inputPassword, hasPassword);
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
      groupId: 3,
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

const handleLogin = async (userData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [
          { email: userData.valueLogin },
          { phone: userData.valueLogin },
        ],
      },
    });

    if (user) {
      let checkPass = checkPassword(userData.password, user.password);
      if (checkPass) {
        let roles = await getGroupsWithRoles(user);

        let payload = {
          email: user.email,
          roles,
          inpiresin: process.env.JWT_EXPIRES_IN,
        };

        let token = createJWT(payload);

        return {
          EM: "Loign Sucess!",
          EC: 0,
          DT: {
            access_token: token,
            Group: roles,
            email: user.email,
            username: user.username,
          },
        };
      } else {
        return {
          EM: "Password không chính xác",
          EC: 1,
          DT: "",
        };
      }
    }
    return {
      EM: "Email/Phone không chính xác",
      EC: 1,
      DT: "",
    };
  } catch (error) {
    console.log("check error: ", error);
    return {
      EM: "Something wrong server!",
      EC: 2,
      DT: "",
    };
  }
};

module.exports = {
  handleRegister,
  handleLogin,
};
