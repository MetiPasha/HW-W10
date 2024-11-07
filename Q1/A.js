let contacts = [
  { id: 1, name: "Meti Pasha", number: "09197750756" },
  { id: 2, name: "Reza Mashhadi", number: "09364846156" },
  { id: 3, name: "Milad VZ", number: "09145645982" },
  { id: 4, name: "Hamid Parvizi", number: "09331865189" },
];

function renderContacts() {
  const contactList = document.getElementById("contactList");
  contactList.innerHTML = "";
  contacts.forEach((contact) => {
    const contactItem = document.createElement("div");
    contactItem.className =
      "flex justify-between items-center border-b border-gray-200 py-2";
    contactItem.innerHTML = `
            <div>
                <div class="font-semibold">${contact.name}</div>
                <div class="text-gray-500">${contact.number}</div>
            </div>
            <div class="flex space-x-2">
                <button onclick="editContact(${contact.id})" class="text-blue-500">Edit</button>
                <button onclick="deleteContact(${contact.id})" class="text-red-500">Delete</button>
            </div>
        `;
    contactList.appendChild(contactItem);
  });
}

function showAddContact() {
  document.getElementById("contactModal").classList.remove("hidden");
  document.getElementById("modalTitle").innerText = "Create Contact";
  document.getElementById("contactId").value = "";
  document.getElementById("contactName").value = "";
  document.getElementById("contactNumber").value = "";
}

function editContact(id) {
  const contact = contacts.find((c) => c.id === id);
  document.getElementById("contactModal").classList.remove("hidden");
  document.getElementById("modalTitle").innerText = "Edit Contact";
  document.getElementById("contactId").value = contact.id;
  document.getElementById("contactName").value = contact.name;
  document.getElementById("contactNumber").value = contact.number;
}

function saveContact() {
  const id = document.getElementById("contactId").value;
  const name = document.getElementById("contactName").value;
  const number = document.getElementById("contactNumber").value;

  if (id) {
    const contact = contacts.find((c) => c.id == id);
    contact.name = name;
    contact.number = number;
  } else {
    const newContact = { id: Date.now(), name, number };
    contacts.push(newContact);
  }
  hideModal();
  renderContacts();
}

function deleteContact(id) {
  contacts = contacts.filter((contact) => contact.id !== id);
  renderContacts();
}

function hideModal() {
  document.getElementById("contactModal").classList.add("hidden");
}

function searchContacts() {
  const searchValue = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchValue) ||
      contact.number.includes(searchValue)
  );
  displayFilteredContacts(filteredContacts);
}

function displayFilteredContacts(filteredContacts) {
  const contactList = document.getElementById("contactList");
  contactList.innerHTML = "";
  filteredContacts.forEach((contact) => {
    const contactItem = document.createElement("div");
    contactItem.className =
      "flex justify-between items-center border-b border-gray-200 py-2";
    contactItem.innerHTML = `
            <div>
                <div class="font-semibold">${contact.name}</div>
                <div class="text-gray-500">${contact.number}</div>
            </div>
            <div class="flex space-x-2">
                <button onclick="editContact(${contact.id})" class="text-blue-500">Edit</button>
                <button onclick="deleteContact(${contact.id})" class="text-red-500">Delete</button>
            </div>
        `;
    contactList.appendChild(contactItem);
  });
}

renderContacts();
