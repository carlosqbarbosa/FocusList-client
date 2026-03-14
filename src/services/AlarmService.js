import { Howl } from "howler";


const alarm = new Howl({
  src: ["/alarm.mp3"], 
  volume: 1.0
});

export function playAlarm() {
  alarm.play();
}


export function notifyUser(message) {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification(message);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification(message);
      }
    });
  }
}
