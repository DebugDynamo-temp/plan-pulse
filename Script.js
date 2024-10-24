
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const filterTasks = document.getElementById('filter-tasks');


function createTaskElement(taskText) {
  const li = document.createElement('li');
  li.className = 'task-item pending'; // Default status is pending


  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <button class="complete-task">✔️</button>
    <button class="delete-task">❌</button>
  `;


  li.querySelector('.complete-task').addEventListener('click', () => {
    li.classList.toggle('completed');  // Toggle between completed/pending
    li.classList.toggle('pending');    
  });

 
  li.querySelector('.delete-task').addEventListener('click', () => {
    taskList.removeChild(li); // Remove task from the list
  });

  return li;
}


addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim(); // Get input value

  if (taskText) {
    const taskElement = createTaskElement(taskText); // Create task
    taskList.appendChild(taskElement); // Add to task list
    taskInput.value = ''; // Clear input field
  }
});


filterTasks.addEventListener('change', (e) => {
  const filterValue = e.target.value;
  const tasks = taskList.getElementsByTagName('li');

  Array.from(tasks).forEach((task) => {
    switch (filterValue) {
      case 'all':
        task.style.display = 'flex';
        break;
      case 'completed':
        task.style.display = task.classList.contains('completed')
          ? 'flex' : 'none';
        break;
      case 'pending':
        task.style.display = task.classList.contains('pending')
          ? 'flex' : 'none';
        break;
    }
  });
});


taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTaskButton.click(); // Trigger add button click
  }
});
