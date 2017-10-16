function createExpenseElement(expense) {
    const element = document.createElement('li');
    element.className = 'list-group-item expense';
    element.innerHTML = `<a href="/expense/${expense.id}">${expense.name}
                            <span class="total">${getExpenseTotal(expense)}</span>
                        </a>`;

    return element;    
}

function updateHomeView() {
    const expensesListElement = document.querySelector('#expenses-list');
    const expenseElements = expensesListElement.querySelectorAll('.expense');

    getExpenses(expenses => {
        expenseElements.forEach(e => {
            expensesListElement.removeChild(e);
        });

        expenses.forEach(expense => {
            expensesListElement.appendChild(createExpenseElement(expense));
        });
    
        const totalField = expensesListElement.querySelector('.total-row .total');
        totalField.innerHTML = getTotal(expenses);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    updateHomeView();

    const addBtn = document.querySelector('#add');

    addBtn.addEventListener('mousedown', () => {
        const newExpense = createNewExpense();
        saveExpense(newExpense);
        updateHomeView();
     });
}, false);


let swRegistration = null;
const notifyBtn = document.getElementById('notify');

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

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    let outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');

    navigator.serviceWorker.getRegistration()
        .then(function(swReg) {
            swRegistration = swReg;
            notifyBtn.disabled = false;
        })
        .catch(function(error) {
            console.error('Service Worker Error', error);
        });
} else {
    console.warn('Push messaging is not supported');
}
