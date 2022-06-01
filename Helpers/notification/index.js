import * as Notifications from 'expo-notifications';

export const schedulePushNotification = async (title, body, data) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: null,
  });
};
