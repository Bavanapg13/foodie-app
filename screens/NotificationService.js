
import * as Notifications from 'expo-notifications';

// Display notifications while Foodie is open
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Request notification permission
export async function requestNotificationPermission() {
  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } =
      await Notifications.requestPermissionsAsync();

    finalStatus = status;
  }

  return finalStatus === 'granted';
}

// Schedule a test notification
export async function sendTestNotification() {
  const granted = await requestNotificationPermission();

  if (!granted) {
    throw new Error('Notification permission denied.');
  }

  return await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Foodie Reminder 🍽️',
      body: 'Discover something delicious today!',
      sound: 'default',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
    },
  });
}
