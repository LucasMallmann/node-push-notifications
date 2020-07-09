console.log("Service Worker Loaded...");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Push Notification Received...");

  // Show the notification
  self.registration.showNotification(data.title, {
    body: "Notified by Lucas Mallmann",
    icon:
      "https://cdn4.iconfinder.com/data/icons/social-icon-4/842/facebook-512.png",
  });
});
