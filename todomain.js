// const express=require("express");
// var fs=require("fs");
// const app=express();
// const port=3000;

// app.use(express.static("public"));

// app.use(express.json());

// app.get('/', (req, res) => {
//     res.sendFile("/public/todo.html");
//     return;
// });

// app.get('/', (req, res) => {
// 	res.sendFile("/public/script.js");
// 	return;
// });

// app.get("/getTodo",(req,res)=>{
//     fs.readFile("./data.txt","utf-8",function(err,data)
//     {
//      let todos;
//      if(data.length===0)
//      {
//         todos=[];
//      }
//      else{
//         todos=JSON.parse(data);
        
//      }
     
//        res.json(todos); 

//     })
	
// });

// app.post('/saveTasks', function(req, res)
// {
//     fs.readFile("./data.txt","utf-8",function(err,data)
//     {
//      if(data.length===0)
//      {
//       todos=[];
//      }
//      else{
//       todos=JSON.parse(data);
//      }
//      todos.push(req.body);
//      console.log(todos);

//      fs.writeFile("./data.txt",JSON.stringify(todos),function(err){
//         res.end();
//      })

//     })
	
// });

// app.post('/checked',function(req,res){
// let id=req.body.id;
// fs.readFile("./data.txt","utf-8",function(err,data){
//    todos=JSON.parse(data);
//    todos.forEach(function(elem){
//       if(elem.id==id){
//          if(elem.checkflag==false){
//             elem.checkflag=true;
//          }
//          else
//          {
//             elem.checkflag=false;
//          }
//       }
//    })
// })

// fs.writeFile("./data.txt",JSON.stringify(todos),function(err)
// {
//    res.end();
// })

// });

// app.post("/deleted",function(req,res){
//    let id = req.body.id;
//    fs.readFile("./data.txt","utf-8",function(err,data){
//      todos = JSON.parse(data)
     
//      todos.forEach(function(elem){
//        if(elem.id == id){
//            elem.deleteFlag = true;
//          }
//      })
//      fs.writeFile("./data.txt",JSON.stringify(todos),function(err){
//        res.end();
//      })
//    })
//  })
// app.listen(port,()=>{
//    console.log(`app listening at localhost:${port}`);
// })

const express = require('express')
const app = express()
const port = 3000
var fs = require('fs');

app.use(express.static("public"));

app.use(express.json());

app.get('/', (req, res) => {
  fs.readFile("./index.html","utf-8",function(err,data){
    if(err){
      res.end("File not Found");
    }
    else{
      res.end(data);
    }
  })
})

app.get("/getTodo",function(req,res){
  fs.readFile("./data.txt","utf-8",function(err,data){
    if(data.length === 0){
      todos = [];
    }
    else{
      todos = JSON.parse(data)
      console.log("yes",todos);
    }
    res.json(todos);
  })
})

app.post("/saveTasks",function(req,res){
  fs.readFile("./data.txt","utf-8",function(err,data){
    if(data.length === 0){
      todos = [];
    }
    else{
      todos = JSON.parse(data)
    }
    todos.push(req.body);
    fs.writeFile("./data.txt",JSON.stringify(todos),function(err){
      res.end();
    })
  })
})

app.post("/checked",function(req,res){
  let id = req.body.id;
  fs.readFile("./data.txt","utf-8",function(err,data){
    todos = JSON.parse(data)
    
    todos.forEach(function(elem){
      if(elem.id == id){
        if(elem.checkFlag == false){
          elem.checkFlag = true
        } 
        else{
          elem.checkFlag = false;
        }
      }
    })
    fs.writeFile("./data.txt",JSON.stringify(todos),function(err){
      if(err){
      }
      res.end();
    })
  })
})

app.post("/deleted",function(req,res){
  let id = req.body.id;
  fs.readFile("./data.txt","utf-8",function(err,data){
    todos = JSON.parse(data)
    
    todos.forEach(function(elem){
      if(elem.id == id){
          elem.deleteflag = true;
        }
    })
    fs.writeFile("./data.txt",JSON.stringify(todos),function(err){
      if(err){
      }
      res.end();
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
