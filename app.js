const apiUrl = 'https://672c4dde1600dda5a9f7e1db.mockapi.io/items';


function fetchData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayData(data))
        .catch(error => console.error('Error fetching data:', error));
}

function displayData(items) {
    const content = document.getElementById('content');
    content.innerHTML = '';

    items.forEach(item => {
        content.innerHTML += `
            <div id="item-${item.id}" class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">Name: ${item.name}</h5>
                    <p class="card-text">Description: ${item.description}</p>
                    <p class="card-text">Price: $${item.price}</p>
                    <p class="card-text">Quantity: ${item.quantity}</p>
                    <button class="btn btn-warning" onclick="openEditModal(${item.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteItem(${item.id})">Delete</button>
                </div>
            </div>
        `;
    });
}

function openCreateModal() {
    document.getElementById('itemId').value = '';
    document.getElementById('itemName').value = '';
    document.getElementById('itemDescription').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('itemQuantity').value = '';
    const modal = new bootstrap.Modal(document.getElementById('crudModal'));
    modal.show();
}

function openEditModal(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(item => {
            document.getElementById('itemId').value = item.id;
            document.getElementById('itemName').value = item.name;
            document.getElementById('itemDescription').value = item.description;
            document.getElementById('itemPrice').value = item.price;
            document.getElementById('itemQuantity').value = item.quantity;
            const modal = new bootstrap.Modal(document.getElementById('crudModal'));
            modal.show();
        });
}

function saveItem() {
    const id = document.getElementById('itemId').value;
    const item = {
        name: document.getElementById('itemName').value,
        description: document.getElementById('itemDescription').value,
        price: parseFloat(document.getElementById('itemPrice').value),
        quantity: parseInt(document.getElementById('itemQuantity').value)
    };

    if (id) {
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        })
            .then(() => fetchData())
            .catch(error => console.error('Error updating item:', error));
    } else {
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        })
            .then(() => fetchData())
            .catch(error => console.error('Error adding item:', error));
    }
}

function deleteItem(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
        .then(() => fetchData())
        .catch(error => console.error('Error deleting item:', error));
}

fetchData();
