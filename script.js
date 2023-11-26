let tasks = [];            //Creating an array for storing tasks

loadTasks();                // Load and display tasks from local storage on page load
displayTasks();


let taskInput = document.getElementById('taskInput');  // Event listener for enter key to add tasks
taskInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
       addTask();
    }
})

function addTask() {       //function for adding tasks
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') { //Done when there is valid input
        const newTask = {
            text: taskText,
            priority: false,
            completed: false,
        };

      

        tasks.unshift(newTask); // Add new tasks to the beginning of the list
        displayTasks();
        saveTasksToLocalStorage();
        taskInput.value = '';
    }
}

function deleteTask(index) {    //Function to delete tasks
    tasks.splice(index, 1);
    displayTasks();
    saveTasksToLocalStorage();
}

function togglePriority(index) {
    tasks[index].priority = !tasks[index].priority;
    displayTasks();
    saveTasksToLocalStorage();
}

function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
    saveTasksToLocalStorage();
}

function editTask(index, newText) {
    tasks[index].text = newText.trim();
    if(newText.trim()==='')deleteTask(index);  //delete tasks if it's only whitespace
    tasks[index].editMode = false; 
    displayTasks();
    saveTasksToLocalStorage();
}


function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const iconDiv=document.createElement('div');
        iconDiv.classList.add('iconDiv');

        if (task.completed) {
            li.classList.add('completed');
        }
        
        if (task.editMode) {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = task.text;
            input.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    editTask(index, input.value);
                }
            });

            li.classList.add('edit-mode');
            li.appendChild(input);
        } else {
            li.textContent = task.text;
        }

        
        if (task.priority) {                        
            li.classList.add('priority');
        }

      // Display toggle completion button
        const toggleCompletionButton = document.createElement('button');    
        toggleCompletionButton.onclick = () => toggleCompletion(index);
        toggleCompletionButton.classList.add("item-btn");
                
        const completionIcon = document.createElement('i');                  //add icon
        completionIcon.classList.add("fa-solid","fa-circle-check");
        toggleCompletionButton.appendChild(completionIcon);

        iconDiv.appendChild(toggleCompletionButton);       
            
        const toggleCompletionButtonText = document.createElement("span");   //create a span to contain icon text
        toggleCompletionButtonText.classList.add('icon-text');
        toggleCompletionButtonText.textContent = task.completed ? 'Undo' : 'Complete';;
        toggleCompletionButton.appendChild(toggleCompletionButtonText);
           

       // Display toggle priority button
        const togglePriorityButton = document.createElement('button');    
        togglePriorityButton.onclick = () => togglePriority(index);
        togglePriorityButton.classList.add("item-btn");

            
        const priorityIcon=document.createElement('i');                     //add icon
        priorityIcon.classList.add("fa-solid", "fa-circle-exclamation");
        togglePriorityButton.appendChild(priorityIcon);
        
         iconDiv.appendChild(togglePriorityButton); 
             
        const togglePriorityButtonText = document.createElement("span");    //create a span to contain text
        togglePriorityButtonText.classList.add('icon-text');
        togglePriorityButtonText.textContent = task.priority ? 'Unmark' : 'Important';
        togglePriorityButton.appendChild(togglePriorityButtonText);
             

        // Display edit button
        const editButton = document.createElement('button');    
        editButton.onclick = () => {
            tasks.forEach((t) => (t.editMode = false)); // Close existing edit mode 
            task.editMode = true;
            displayTasks();
        };
        editButton.classList.add("item-btn");
              
        
        const editIcon = document.createElement('i');
        editIcon.classList.add("fa-solid", "fa-pen-to-square");
        editButton.appendChild(editIcon);
       
        iconDiv.appendChild(editButton);   
         
        const editButtonText = document.createElement("span");
        editButtonText.classList.add('icon-text');
        editButtonText.textContent = 'Edit';
        editButton.appendChild( editButtonText);

         // Display delete button
         const deleteButton = document.createElement('button');        
         deleteButton.onclick = () => deleteTask(index);
         deleteButton.classList.add("item-btn");
        
            
         const deleteIcon=document.createElement('i');
         deleteIcon.classList.add("fa-solid" , "fa-trash");
         deleteButton.appendChild(deleteIcon);
        
         iconDiv.appendChild(deleteButton); 
            
         const deleteButtonText = document.createElement("span");
         deleteButtonText.classList.add('icon-text');
         deleteButtonText.textContent = 'Delete';
         deleteButton.appendChild(deleteButtonText);
            
        li.appendChild(iconDiv);                                //Set icon division to be a child of list item tag
        taskList.appendChild(li);                               //Add all list items to unordered list

    });
}

function saveTasksToLocalStorage() {                           //savetsks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    tasks = storedTasks ? JSON.parse(storedTasks) : [];
}


