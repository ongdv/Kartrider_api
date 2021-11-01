import axios from "axios";
import ApiConstant from "./ApiConstant";
module.exports = {
  getUserInfo: async (user_nm) => {
    try {
      const url = ApiConstant.GET_USER_BY_NICKNAME.replace(
        ":nickname",
        user_nm
      );
      const { status, data, messgae } = await axios.get(url);
      if (status !== 200) {
        throw messgae;
      }
      return result;
    } catch (error) {}
  },
};
