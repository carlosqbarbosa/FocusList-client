import { Howl } from "howler";

// 🔔 Som do alarme
const alarm = new Howl({
  src: ["/alarm.mp3"], // o arquivo ficará em /public/alarm.mp3
  volume: 1.0
});

export function playAlarm() {
  alarm.play();
}

// 🔔 Notificação do navegador
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
