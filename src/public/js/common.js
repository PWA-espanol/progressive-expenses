const serverUrl = 'http://localhost:3000/';
function serverClient(url, options) {
    if (!('fetch' in window)) {
        // Real fetch polyfill: https://github.com/github/fetch
        return new Promise( (resolve, reject) => {
            let request = new XMLHttpRequest();
            
            request.open(options.method || 'get', url);

            request.onload = () => {
                resolve();
            };

            request.onerror = reject;

            request.send(options.body);

            function resolve() {
                return {
                    ok: (request.status/200|0) == 1,		// 200-299
                    status: request.status,
                    statusText: request.statusText,
                    url: request.responseURL,
                    clone: resolve,
                    text: () => Promise.resolve(request.responseText),
                    json: () => Promise.resolve(request.responseText).then(JSON.parse),
                    blob: () => Promise.resolve(new Blob([request.response]))
                };
            };
        });
    }

    return fetch(url, options);
}

function saveExpense(expense) {
    serverClient(`${serverUrl}api/expense/${expense.id || ''}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(expense)
    });
}

function getExpenses() {
    return serverClient(`${serverUrl}api/expense`)
            .then(response => response.json());
}

function getExpense(expenseId) {
    return serverClient(`${serverUrl}api/expense/${expenseId}`)
            .then(response => response.json());
}

function createNewExpense() {
    //const expenses = getExpenses();
    //let maxId = Math.max.apply(Math, expenses.map(o => o.id ));
    return { 
        //id: maxId + 1,
        name: 'Nombre',
        details: []
    };
}

function getExpenseTotal(expense) {
    let total = 0;
    if (expense && expense.details) {
        expense.details.forEach( item => {
            total += item.cost;
        });
    }

    return total;
}

function getTotal(expenses) {
    let total = 0;
    expenses.forEach( expense => {
        total += getExpenseTotal(expense);
    });

    return total;
}

