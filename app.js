
const list = document.querySelector('#list');
const form = document.querySelector('form');
const taskInput = document.querySelector('input[name="newTask"')

if (localStorage.getItem('todoArray')) {
    todoArray = JSON.parse(localStorage.getItem('todoArray'))
    for (let i = 0; i < todoArray.length; i++) {
        let newTask = document.createElement("li");
        let removeBtn = document.createElement('button');
        removeBtn.innerText = 'X'
        newTask.innerText = todoArray[i].task + ' ';
        newTask.id = todoArray[i].task;
        newTask.appendChild(removeBtn)
        newTask.isCompleted = todoArray[i].isCompleted ? true : false;
        if (newTask.isCompleted) {
          newTask.classList.toggle('complete');
        }
        list.appendChild(newTask);
      }
} else {
    todoArray = []
}

function updateArray() {
    localStorage.clear()
    todoArray = []
    const listItems = document.querySelectorAll('li')
    for (let i=0; i<listItems.length; i++) {
        todoArray.push({
            task: listItems[i].id, 
            isCompleted: listItems[i].classList.contains('complete')
        })
    }
    localStorage.setItem('todoArray', JSON.stringify(todoArray))
}


form.addEventListener('submit', function(e){
    e.preventDefault();
    const newTask = document.createElement('li');
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'X'
    newTask.innerText = taskInput.value + ' ';
    newTask.id = taskInput.value
    newTask.appendChild(removeBtn);
    list.appendChild(newTask);
    updateArray()
    taskInput.value = ""
})

list.addEventListener('click', function(e){
    if(e.target.tagName === 'BUTTON'){
        e.target.parentElement.remove()
    } else if (e.target.tagName === 'LI'){
        e.target.classList.toggle('complete')
    }
    updateArray()
})



