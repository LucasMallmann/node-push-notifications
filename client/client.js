const publicVapidKey =
  "BFpf9dMODw5sG5_B4Yb5F3P17sNatS04yMj63mpwqyWsSnHpwSP0eZ1iWG1NqWdEVpE4DZD3nuJU9fDRWbsVta4";

// Check for Service Worker
if ("serviceWorker" in navigator) {
  send().catch((err) => console.error(err));
}

// Register the service worker
// Register our push
// Send the notification
async function send() {
  console.log("Registering Service Worker...");

  // Registering the Service Worker
  const register = await navigator.serviceWorker.register("/sw.js", {
    scope: "/",
  });

  console.log("Service Worker Registered...");

  console.log(register);

  // Register Push
  console.log("Registering the push...");

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  console.log("Push Notification Registered");

  // Send push notification
  console.log("Sending Push to the Backend...");
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: { "content-type": "application/json" },
  });

  console.log("Push Notification Sent");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
