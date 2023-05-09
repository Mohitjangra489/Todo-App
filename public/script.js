
let container = document.getElementById("container");
let leftdiv = document.getElementById("left");
let rightdiv = document.getElementById("right");
let input = document.getElementById("input");
let leftpara;

var key = 0;
let checkFlag = false;

getTodo(function (todos)                                                  // for getting server data on page reload.
{
   // console.log(todos);
   let max = -1;
   todos.forEach(function (todo) {
      if (todo.id > max) {
         max = todo.id
      }
   })
   if (max >= 0) {
      key = max + 1;
   }
   todos.forEach(function (todo) {
      if (todo.deleteflag == false) {
         let value = todo.task;
         let id = todo.id;

         let leftdatadiv = document.createElement("div");
         leftdatadiv.id = `leftdatadiv${id}`;
         leftpara = document.createElement("p");
         leftpara.id = `leftpara${id}`;
         leftpara.style.fontSize = "40px";
         leftpara.innerHTML = value;
         // leftpara.style.wordBreak;

         let checkbox = document.createElement("input");
         checkbox.setAttribute("type", "checkbox");
         checkbox.id = `check${id}`;
         checkbox.style.marginLeft="650px";
         if (todo.checkFlag == true) {
            checkbox.checked = true;
            leftpara.style["textDecorationLine"] = "line-through";
         }

         checkbox.addEventListener("click", checked);

         let img = document.createElement("img");
         img.setAttribute("src", "delete.png");
         img.setAttribute("id", `delet${id}`);
         img.addEventListener('click', deleted);
         let line = document.createElement("hr");
         leftdatadiv.appendChild(leftpara);
         leftdatadiv.append(checkbox, img);
         leftdatadiv.appendChild(line);
         leftdiv.appendChild(leftdatadiv);
        

      }
   })
});


function addtask(event){
   if (event.key == "Enter" && input.value!="") {
      let value = event.target.value;
      // console.log(value);
      saveTasks(value, function () {
         input.value = "";                                                         
         let leftdatadiv = document.createElement("div");
         leftdatadiv.id = `leftdatadiv${key}`;
         let leftpara = document.createElement("p");
         leftpara.id = `leftpara${key}`;
         leftpara.style.fontSize = "40px";
         leftpara.innerHTML = value;
         // leftpara.style.wordBreak;

         let checkbox = document.createElement("input");
         checkbox.setAttribute("type", "checkbox");
         checkbox.id = `check${key}`;
         checkbox.addEventListener('click',checked);
         checkbox.style.marginLeft="650px";
         let img = document.createElement("img");
         img.setAttribute("src", "delete.png");
         img.setAttribute("id", `delet${key}`);
         img.addEventListener('click', deleted);
         let line = document.createElement("hr");
         leftdatadiv.appendChild(leftpara);
         leftdatadiv.append(checkbox, img);
         leftdatadiv.appendChild(line);
         leftdiv.appendChild(leftdatadiv);
      
         key++;

      });
   }
}



function saveTasks(value, callback) {
   // console.log(checkedvalue);
   var request = new XMLHttpRequest();
   request.open("POST", "/saveTasks");

   request.setRequestHeader("Content-Type", "application/json");

   request.send(JSON.stringify({task:value,checkFlag:false, deleteflag:false, id:key }));

   request.addEventListener("load", function () {
      callback();
   });

}

function getTodo(callback) {
   // console.log("inside getserver1 data");
   var request = new XMLHttpRequest();
   request.open("GET", "/getTodo");
   request.send();

   request.addEventListener("load", function () {
      // console.log("inside getserver2 data");
      // console.log(request.responseText);

      callback(JSON.parse(request.responseText));

   });

}

function checked(event) {
   let id = event.target.id.slice(5);
   console.log(id);
   let request = new XMLHttpRequest();
   request.open("POST", "/checked");
   request.setRequestHeader("Content-Type", "application/json");
   request.send(JSON.stringify({id:id}));

   request.addEventListener("load", function () {
      let request1 = new XMLHttpRequest();
      request1.open("GET", "/getTodo");
      //  request2.setRequestHeader("Content-Type","application/json");
      request1.send();
      request1.addEventListener("load", function () {
         let element = request1.responseText;
         let todo = JSON.parse(element);
         console.log(todo);
         todo.forEach(function (elem) {
            if (elem.id == id) {
               console.log(elem.id,"==",id)
               if (elem.checkFlag == true) {
                  console.log("entered");
                  document.getElementById(`leftpara${id}`).style["textDecorationLine"] = "line-through";
               }
               else {
                  document.getElementById(`leftpara${id}`).style["textDecorationLine"] = "none";
               }
            }
         })
      })

   })

}

function deleted(event){
   let id = event.target.id.slice(5);
   // console.log(id);
   let request = new XMLHttpRequest();
   request.open("POST","/deleted");
   request.setRequestHeader("Content-Type","application/json");
   request.send(JSON.stringify({id:id}));
   request.addEventListener("load",function(){
     document.getElementById(`leftdatadiv${id}`).style["display"] = "none";
   })
 
 }
 

