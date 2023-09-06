const addTask = document.getElementById("taskAdding");
const addDate = document.getElementById("dateAdding");
const subTaskAdding = document.getElementById("taskbar");
const adding = document.getElementById("addBtn");

var tasksList=JSON.parse(localStorage.getItem("Tasks")) || [];

/* Show items when loading the page */
loadingPage();
function loadingPage(){
const sethtml = tasksList.map(function(Items){
    var result = `<div class="tasks">
    <div class="title-div">
      <h3 class="subtitle date">${Items.title}</h3>
    </div>
    <div class="date-div">
      <h3 class="subtitle date">${Items.date}</h3>
    </div>
    <i class="fa-regular fa-trash-can" onClick="deleteTodo(${Items.id})"></i>
    <i class="fa-regular fa-pen-to-square"></i>
  </div>`;

  return result;
});

subTaskAdding.innerHTML=sethtml.join('');
}

//Input items
function inputInto(){
    var idNum = localStorage.getItem("IdNumber") || tasksList.length;
    var newdate = new Date(addDate.value);
    var pendingTasks=
        {
            id:parseInt(idNum),
            title: addTask.value,
            date: newdate.toDateString()
        }

    tasksList.push(pendingTasks);
    var num=parseInt(idNum);
    localStorage.setItem("IdNumber",num+=1);
    loadingPage();

}

//savedata on local storage
function savaData(){
  localStorage.setItem("Tasks",JSON.stringify(tasksList));
}

//delete items
function deleteTodo(id){
  const newTodoList = tasksList.filter((item)=> item.id != id);
  tasksList = newTodoList;
  loadingPage();
  savaData();
}

adding.addEventListener("click",function(){
    event.preventDefault();
    inputInto();
    savaData();
})