const elementMsg = document.querySelector(".notification");

function removeClassOnline() {
  elementMsg.classList.remove("online");
}

function removeClassOffline() {
  elementMsg.classList.remove("offline");
}

function disabledDisplay() {
  elementMsg.style.display = "none";
}

function displayShow() {
  elementMsg.style.display = "block";
}

function setTextElement(arg) {
  elementMsg.textContent = arg;
}

function online() {
  removeClassOffline();
  elementMsg.classList.add("online");
}

function offline() {
  removeClassOnline();
  elementMsg.classList.add("offline");
}

function offNotification() {
  setTextElement("");
  removeClassOffline();
  removeClassOnline();
}

const checkOnlineStatus = async () => {
  try {
    const online = await fetch("https://lailsonandesson.pages.dev/");
    return online.status >= 200 && online.status < 300;
  } catch (err) {
    return;
  }
};

window.addEventListener("online", async () => {
  const result = await checkOnlineStatus();

  if (result) {
    displayShow();
    online();
    setTextElement("Online");

    setInterval(() => {
      offNotification();
    }, 5000);

  } else {
    displayShow();
    offline();
    setTextElement("Sem conexão com servidor!");

    setInterval(() => {
      offNotification();
    }, 5000);
  }
});

window.addEventListener("offline", async () => {
  const result = await checkOnlineStatus();

  if (!result) {
    displayShow();
    offline();
    setTextElement("Offline");

    setInterval(() => {
      offNotification();
    }, 5000);
  }
});
