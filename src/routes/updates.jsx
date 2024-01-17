import { useEffect, useState } from "react";
import { listenToNotifications } from "../utils/notifications";

// const notificationTypes = {
//   type: "post_liked",
//   message: "Your post has been liked",
//   createdFor: "userId",
//   createdBy: "userId",
//   createdAt: "timestamp",
// };

const Updates = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userEmail");
    const unsubscribe = listenToNotifications(
      userId,
      (notifications) => {
        console.log("Received notifications: ", notifications);
        setNotifications(notifications);
      },
      (error) => {
        console.error("Error while receiving real-time notifications: ", error);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-7xl px-[5%] mx-auto">
      <div className="mt-10">
        <h1 className="text-base text-indigo-400 underline underline-offset-1">
          Updates
        </h1>
      </div>
      <div className="mt-5">
        {notifications.map((notification) => (
          <div key={notification.uid} className="bg-slate-100 p-5 rounded-md">
            <div>
              <div className="text-slate-950">
                Created For:{" "}
                <span className="text-indigo-600">
                  {notification.createdFor}
                </span>
              </div>
              <div className="text-slate-950">
                Created By:{" "}
                <span className="text-indigo-600">
                  {notification.createdBy}
                </span>
              </div>
            </div>
            <div className="text-slate-950">
              <h1 className="text-base">{notification.message}</h1>
            </div>
            <div className="text-slate-950">
              <h1 className="text-base">{notification.post}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Updates;
