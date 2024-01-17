import {
  doc,
  setDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../../firebase.config";

export async function createNotification(notification) {
  const notificationRef = doc(db, "notifications", notification.uid);
  setDoc(notificationRef, notification);
}

export function listenToNotifications(
  forUser,
  onNotificationsReceived,
  onError
) {
  const notificationsCollection = collection(db, "notifications");

  const notificationsQuery = query(
    notificationsCollection,
    where("createdFor", "==", forUser)
  );

  const unsubscribe = onSnapshot(
    notificationsQuery,
    (notificationSnapshot) => {
      const notifications = notificationSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      onNotificationsReceived(notifications);
    },
    (error) => {
      console.error("Error while receiving real-time notifications: ", error);
      if (onError) {
        onError(error);
      }
    }
  );

  // Return the unsubscribe function to allow the caller to stop listening to updates when needed
  return unsubscribe;
}
