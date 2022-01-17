const toDoForm=document.getElementById("todo-form");
const toDoInput=toDoForm.querySelector("input");
const toDoList=document.getElementById("todo-list");

const TODOS_KEY="todos";
let toDos=[];

function saveToDos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}

function deleteToDo(e){
    const li=e.target.parentElement;
    toDos=toDos.filter(item => item.id!=li.id);
    li.remove();
    saveToDos();
}

function paintToDo(newTodoObj){
    const li=document.createElement("li");
    const span=document.createElement("span");
    const button=document.createElement("button");
    li.id=newTodoObj.id;
    span.innerText=newTodoObj.text;
    button.innerText="❌";

    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
    button.addEventListener("click",deleteToDo);
}

function handleToDoSubmit(e){
    e.preventDefault();
    const newTodo=toDoInput.value;
    toDoInput.value="";
    const newTodoObj={
        text:newTodo,
        id:Date.now(),
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit",handleToDoSubmit);

const savedToDos=localStorage.getItem(TODOS_KEY);
if (savedToDos){
    const parsedToDos=JSON.parse(savedToDos);
    toDos=parsedToDos;
    parsedToDos.forEach(paintToDo);
}