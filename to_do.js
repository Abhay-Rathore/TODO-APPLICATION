const to_do=()=>
{
    let title=document.getElementById("title").value;
    let description=document.getElementById("description").value;
    if(!title)
    {
        alert("Title cannot be blank");
        return;
    }
    if(!description)
    {
        alert("Description cannot be blank");
        return;
    }
    let todos=[];
    let localTodos=localStorage.getItem('todos');
    if(localTodos !=null)
    {
        todos=JSON.parse(localTodos);
    }
    todoObject={
        title:title,
        desc:description,
        id:Date.now(),
    };
    todos.push(todoObject);
    localStorage.setItem("todos",JSON.stringify(todos));
    show_todo();
    document.getElementById("title").value="";
    document.getElementById("description").value="";
}

const show_todo=()=>
{
    let content="";
    let todoString=localStorage.getItem('todos');
    if(todoString==null)
    {
         content+='<h3>NO TODO TO SHOW</h3>';
    }
    else
    {
        let todos=JSON.parse(todoString);
        for(let todo of todos.reverse())
        {
            content+=`
            
            <div class="card mt-2">
            
              <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">             
                  <h3 class="text-start">${todo.title}</h3>                
                  <button onclick="del(${todo.id})" class="btn btn-danger btn-sm text-end">Delete</button>
              </div>
                <p>${todo.desc}</p>
             </div>
            </div>
            `
        }
    }
    document.getElementById("main-content").innerHTML=content;
}
const del=(id)=>
{
    let todoString=localStorage.getItem('todos');
    if(todoString==null) return;
    let todos=JSON.parse(todoString);
    todos=todos.filter(todo=>todo.id!=id);
    localStorage.setItem("todos",JSON.stringify(todos));
    show_todo();
}
show_todo();