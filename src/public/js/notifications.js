let swRegistration = null;

function displayNotification() {
    navigator.serviceWorker.getRegistration().then(function(reg) {
        swRegistration = reg;
        swRegistration.pushManager.getSubscription()
            .then(function (subscription) {
                if (Notification.permission === 'granted') {
                    createNotification();
                } else {
                    if (Notification.permission !== 'denied') {
                        subscribeUser().then(function (subscription) {
                            if (Notification.permission === "granted") {
                                createNotification();
                            }
                        })
                    }
                }
            });
    });
}

function createNotification() {
    const options = {
        body: 'Esto es una notificación',
        icon: 'img/logo-512.png',
        vibrate: [100, 50, 100]
    };
    swRegistration.showNotification('¡Notificación!', options);
}

const VAPID_VALID_PUBLIC_KEY = "BFEXH8pInoeBX-2Inzu9830UuJWL6pVx_QZUBwWd8TWfZif5kyaeNrUlB9ZQLPLW5Xv49aZdJ8e15LdHnXtXoH8";
function subscribeUser() {
    return swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(VAPID_VALID_PUBLIC_KEY)
    })
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');

    navigator.serviceWorker.getRegistration()
        .then(function(swReg) {
            swRegistration = swReg;
        })
        .catch(function(error) {
            console.error('Service Worker Error', error);
        });
} else {
    console.warn('Push messaging is not supported');
}


if (navigator.serviceWorker) {
    window.addEventListener('message', event => { // non-standard Chrome behaviour
        if (event.origin && event.origin !== location.origin) return;
        onServiceWorkerMessage(event.data);
    });
    navigator.serviceWorker.addEventListener("message", event => onServiceWorkerMessage(event.data));
}

function onServiceWorkerMessage(message) {
    if (message.action === 'updateHome') {
        updateHomeView();
    }
}