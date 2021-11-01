const BASE_URL = process.env.KART_SDK_URL;
module.exports = {
    GET_USER_BY_NICKNAME: `${BASE_URL}/users/nickname/:nickname`,
}