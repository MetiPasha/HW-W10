// const url = "https://67266d54302d03037e6d80e2.mockapi.io/todo/user";

// document
//   .getElementById("loginForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent default form submission

//     // Sample username and password

//     // Get the values from the input fields
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;
//     let correctUsername;
//     let correctPassword;
//     let data = req(`${url}/user/?user=${username}`, "GET").then((response) => {
//       response.forEach((i) => {
//         if (i.user == username) {
//           correctUsername = username;
//           correctPassword = data.pass;
//           userId = i.id;
//         }
//       });
//     });

//     if (username === correctUsername && password === correctPassword) {
//       localStorage.setItem("user", userId);
//       window.location.href = "dashboardPage.html";
//     } else {
//       alert("Invalid username or password. Please try again.");
//     }
//   });

// function logout() {
//   window.location.href = "login.html";
// }
// function req(url, method, context = null) {
//   const headers = { "Content-Type": "application/json" };
//   const options = {
//     method: method,
//     headers: headers,
//     body: context ? JSON.stringify(context) : null,
//   };
//   return fetch(url, options).then((response) => {
//     if (response.ok) {
//       return response.json();
//     }
//   });
// }

// const url = "https://67266d54302d03037e6d80e2.mockapi.io/todo/user";

// document
//   .getElementById("loginForm")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault(); // Prevent default form submission

//     // Get the values from the input fields
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;

//     let correctUsername = null;
//     let correctPassword = null;
//     let userId = null;

//     try {
//       const data = await req(`${url}/?user=${username}`, "GET");
//       data.forEach((i) => {
//         if (i.user === username) {
//           correctUsername = i.user;
//           correctPassword = i.pass;
//           userId = i.id;
//         }
//       });

//       if (username === correctUsername && password === correctPassword) {
//         localStorage.setItem("user", userId);
//         window.location.href = "dashboardPage.html";
//       } else {
//         alert("Invalid username or password. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       alert("There was an error. Please try again later.");
//     }
//   });

// function logout() {
//   window.location.href = "login.html";
// }

// function req(url, method, context = null) {
//   const headers = { "Content-Type": "application/json" };
//   const options = {
//     method: method,
//     headers: headers,
//     body: context ? JSON.stringify(context) : null,
//   };
//   return fetch(url, options).then((response) => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error("Network response was not ok");
//     }
//   });
// }
//در کد های بالا یوزر و پس تشخیص داده نمیشوندعلت را نفهمیدم

const apiUrl = "https://67266d54302d03037e6d80e2.mockapi.io/todo/task";

async function fetchTasks() {
  const response = await fetch(apiUrl);
  const tasks = await response.json();
  renderTasks(tasks);
}

function renderTasks(tasks) {
  const inProgressTasksContainer = document.getElementById("inProgressTasks");
  const doingTasksContainer = document.getElementById("willBeDoneTasks");
  const DoneTasksContainer = document.getElementById("doneTasks");

  inProgressTasksContainer.innerHTML = "";
  doingTasksContainer.innerHTML = "";
  DoneTasksContainer.innerHTML = "";

  tasks.map((task) => {
    const taskCard = createTaskCard(task);

    if (task.status === "inprogress") {
      inProgressTasksContainer.appendChild(taskCard);
      task.status === "inprogress";
      createTaskCard(task);
    } else if (task.status === "doing") {
      doingTasksContainer.appendChild(taskCard);
      task.status === "doing";
      createTaskCard(task);
    } else {
      DoneTasksContainer.appendChild(taskCard);
      task.status === "done";
      createTaskCard(task);
    }
  });
}

function createTaskCard(task) {
  const card = document.createElement("div");
  card.className = "task-card";
  card.innerHTML = `
<h3>title:${task.title}</h3>
<p>description:${task.description}</p>
<p>Due: ${task.dueDate}</p>
<p>performer :${task.performer}</p>
<button onclick="openEditModal(${task.id})"> Edit</button>
<button onclick="deleteTask(${task.id})"> Delete</button>
<select id="status-select-${task.id}" onchange="moveTask(${task.id})">
<option value="inprogress" ${
    task.status === "inProgress" ? "selected" : ""
  }>In Progress</option>
<option value="doing" ${
    task.status === "doing" ? "selected" : ""
  }>Will Be Done</option>
<option value="done" ${
    task.status === "done" ? "selected" : ""
  }>Done Tasks</option>
</select>
`;
  return card;
}

async function saveTask(e) {
  e.preventDefault();
  const newTask = {
    title: document.getElementById("taskTitle").value,
    description: document.getElementById("taskDescription").value,
    dueDate: document.getElementById("taskDueDate").value,
    performer: document.getElementById("taskPerformer").value,
    status: document.getElementById("taskStatus").value,
  };
  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });
  closeTaskModal();
  await fetchTasks();
}

async function moveTask(taskId) {
  const selectElement = document.getElementById(`status-select-${taskId}`);
  console.log(selectElement);

  const newStatus = selectElement.value;
  console.log(newStatus);

  const task = await fetch(`${apiUrl}/${taskId}`).then((res) => res.json());
  task.status = newStatus;

  await fetch(`${apiUrl}/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  fetchTasks();
}

async function deleteTask(taskId) {
  await fetch(`${apiUrl}/${taskId}`, { method: "DELETE" });
  fetchTasks();
}
function openTaskModal() {
  document.getElementById("taskForm").reset();
  document.getElementById("taskForm").onsubmit = saveTask;
  document.getElementById("taskModal").style.display = "block";
}
function closeTaskModal() {
  document.getElementById("taskModal").style.display = "none";
}

function openEditModal(taskId) {
  fetch(`${apiUrl}/${taskId}`)
    .then((response) => response.json())
    .then((task) => {
      document.getElementById("taskTitle").value = task.title;
      document.getElementById("taskDescription").value = task.description;
      document.getElementById("taskDueDate").value = task.dueDate;
      document.getElementById("taskPerformer").value = task.performer;
      document.getElementById("taskStatus").value = task.status;
      document.getElementById("taskForm").onsubmit = (e) =>
        updateTask(e, taskId);
      document.getElementById("taskModal").style.display = "block";
    });
}

async function updateTask(event, taskId) {
  event.preventDefault();
  const updatedTask = {
    title: document.getElementById("taskTitle").value,
    description: document.getElementById("taskDescription").value,
    dueDate: document.getElementById("taskDueDate").value,
    performer: document.getElementById("taskPerformer").value,
    status: document.getElementById("taskStatus").value,
  };
  await fetch(`${apiUrl}/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  });
  fetchTasks();
  closeTaskModal();
}

document.getElementById("search").addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const tasks = document.querySelectorAll(".task-card");
  tasks.forEach((task) => {
    const title = task.querySelector("h3").textContent.toLowerCase();
    task.style.display = title.includes(searchTerm) ? "block" : "none";
  });
});
fetchTasks();
