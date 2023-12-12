import notifee, {
  AndroidImportance,
  AuthorizationStatus,
} from "@notifee/react-native";

export const foregroundHandler = async (remoteMessage) => {
  // FOR ios
  const settings = await notifee.requestPermission({
    alert: true,
    badge: true,
    sound: true,
  });
  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    await notifee.displayNotification({
      title: remoteMessage?.notification?.title,
      body: remoteMessage?.notification?.body,
      ios: {
        critical: true,
        importance: AndroidImportance.HIGH,
      },
      data: remoteMessage.data,
    });
  }

  // FOR android
  const channelId = await notifee.createChannel({
    id: remoteMessage?.sentTime?.toString(),
    name: "Firstcontact Channel",
    sound: "default",
  });

  notifee.displayNotification({
    title: remoteMessage?.notification?.title,
    body: remoteMessage?.notification?.body,
    android: {
      channelId: channelId,
      sound: "default",
    },
    data: remoteMessage.data,
  });
};
