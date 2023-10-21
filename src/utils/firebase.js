import { messaging } from "@react-native-firebase/messaging";

const getFCMToken = async () => {
  let token = messaging().getToken();
  return token;
};

export default {
  getFCMToken,
};
