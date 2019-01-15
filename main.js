// use dolar sign to indicate that its a dom node
var $mainInput = document.getElementById('mainInput');

function createTask(name) {
    var dateTime = new Date();
    dateTime = dateTime.toLocaleString('ru-RU', { timeZone: 'Europe/Kiev' });
    return {
        name: name,
        date: dateTime,
        completed: false
    }
}
// Check
function check() {
    var id = this.dataset.id;
    var tasks = getTasks();
    tasks[id].completed = !tasks[id].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    render();
}

function getTasks() {
    var tasks = [];
    var tasks_storage = localStorage.getItem('tasks');
    if (tasks_storage){
        try {
            tasks = JSON.parse(tasks_storage);
        } catch (error){
            console.log('tasks is not a valid JSON')
        }
    }
    return tasks
}

// Add
function addTask(event) {
    if (event.key === "Enter" || event.type === 'click') {
        var taskName = $mainInput.value;
        var tasks = getTasks();
        tasks.unshift(createTask(taskName));
        localStorage.setItem('tasks', JSON.stringify(tasks));
        $mainInput.value = '';
        render();
        // see https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
        // return false  // что бы не срабатывал 'click' дальше
    } else {
        return false
    }

}


// Remove
function remove() {
    var id = this.dataset.id;
    var tasks = getTasks();
    tasks.splice(id, 1);   // Изначально написал .slice и час не мог понять почему не работает. лол
    localStorage.setItem('tasks', JSON.stringify(tasks));
    render();
    return false;
}



// Render
function render() {
    var tasks = getTasks();
    //Создаю список с тасками подставляя время + таск + check + delete
    var html = '<ul>';
    for(var i=0; i<tasks.length; i++) {
        // use ternary operator for shorter if statement
        var taskStatus = (tasks[i].completed) ? 'checked' : '';
        // replace with templete literal using backticks (``)
        html += '<li class="'+ taskStatus +'">' + tasks[i].date + ' : '+ tasks[i].name + '<button class="check" data-id="' + i  + '">' + '<i class="fas fa-check"></i></button>' + '<button class="remove" data-id="' + i  + '">' + '<i class="fas fa-trash"></i></button></li>';
    }
    html += '</ul>';
    // подставляю
    document.getElementById('myItemList').innerHTML = html;
    // remove button
    var removeButtons = document.getElementsByClassName('remove');
    for (var i=0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', remove);
    }

    // check buttons
    var checkButtons = document.getElementsByClassName('check');
    for (var i=0; i < checkButtons.length; i++) {
        checkButtons[i].addEventListener('click', check);
    }
}

document.getElementById('addButton').addEventListener('click', addTask);
document.getElementById('mainInput').addEventListener('keydown', addTask);
render();




// function addTask() {
//     var li = document.createElement("li");
//     var getTask = document.getElementById('mainInput').value;
//     var t = document.createTextNode(getTask);
//     li.appendChild(t);
//     document.getElementById("myItemList").appendChild(li);
//
// }
// var button = document.getElementById("addButton");
// button.onclick = addTask;

////-------------------------------

// var ul = document.createElement('ul');
// document.getElementById('myItemList').appendChild(ul);
//
// function addTask(){
//     var item = document.getElementById("mainInput").value
//     tasks.unshift(item);
//     var li = document.createElement('li');
//     li.innerHTML += item;
//     ul.appendChild(li);
// }
//
// var button = document.getElementById("addButton");
// button.onclick = addTask;
//
// var today = new Date();
// var date = today.getDate() + "." + (today.getMonth()+1) + "." + today.getFullYear();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date+" "+time;


/*
if (tasks.length > 4) {
  tasks.pop()
}
 */

//------------------------------------------

// ADD
//function addTask() {
// document.getElementById("addButton").onclick = function () {
//     var task = document.getElementById('mainInput').value;
//     var temp = {};
//     temp.yolo = task;
//     temp.check = false;
//     var i = tasks.length;
//     tasks[i] = temp;
//     render()
// };
// // Render
// function render() {
//     var render = " ";
//     for (var key in tasks) {
//         render += tasks[key].yolo;
//     }
//     //document.getElementById('myItemList').innerHTML = render;
//      var li = document.createElement('li');
//      li.innerHTML = render;
//      ul.appendChild(li);
// }
// var ul = document.createElement('ul');
// document.getElementById('myItemList').appendChild(ul);

























