const addTask = document.getElementById("taskAdding");
const addDate = document.getElementById("dateAdding");
const subTaskAdding = document.getElementById("taskbar");
const adding = document.getElementById("addBtn");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var updateForm = document.getElementById("editform");
var textfield = document.getElementById("taskEdit");
var datedfield = document.getElementById("dateEdit");
var btn = document.getElementById("editBtn");
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
    <i class="fa-regular fa-trash-can" onclick="deleteTodo(${Items.id})"></i>
    <i class="fa-regular fa-pen-to-square editbtn" id="btns" onclick="editTodo(${Items.id})"></i>
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
            date: newdate.toLocaleDateString()
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

//pop up box and edit items
function editTodo(funcId) {
  modal.style.display = "block";

  span.onclick = function () {
    modal.style.display = "none";
    location.reload();
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      location.reload();
    }
  };

  // Find the task to edit
  const itemToEdit = tasksList.find((item) => item.id === funcId);

  console.log(itemToEdit);

  if (itemToEdit) {
    textfield.value = itemToEdit.title;
    datedfield.value = itemToEdit.date;

    updateForm.addEventListener("click", function () {
      itemToEdit.title = textfield.value;
      itemToEdit.date = datedfield.value;

      savaData();
      loadingPage();
    });
  }

  btn.addEventListener("click", function () {
    modal.style.display = "none";
  });
}

