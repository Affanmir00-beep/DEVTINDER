const express=require('express');
//const app=express(); it mrans we are creatin our node application this is instance of express js application. we are basically creating a new web server using express js framework. we can use this app variable to create routes, middleware, and other functionalities of our web application. we have to call listen on this app variable to start the server and listen for incoming requests on a specific port.
const app=express();
const { authmiddleware ,userauth}=require("./middlewares/auth.js");
// const {userauth}=require("./middlewares/auth.js");
// this function is known as req handler function. it takes two parameters req and res. req is the request object that contains information about the incoming request, such as the HTTP method, headers, and body. res is the response object that we can use to send a response back to the client. in this case we are sending a simple text response "hello from the server" using the send method of the response object.
//  wehn  we do this and open localhost:3000 in the browser we will see hello from the server printed on the screen. this is basically responding to that incoming request. this is because our server is listening for incoming requests on port 3000 and when we make a request to that port, our req handler function is executed and sends the response back to the client.


// if we go to localhost:3000/hello localhost:3000/hey it will always show hello from the server because we have not specified any route in our req handler function.  whatever req come in we have send hello from the server. we can specify a route using app.get() or app.post() methods.  



// app.use("/test/2",(req,res)=>{
//     res.send("hello from test route 2")
// });


// app.use("/test",(req,res)=>{
//     res.send("hello from the test route")
// });


//  now if we go to any other route it show cannnot get but if we go to /test it show response hello from the test route. this is because we have specified a route /test in our req handler function. so when we make a request to that route, our req handler function is executed and sends the response back to the client.

// itlll not even show anything on homepage because we have not specified any route for home page. we can specify a route for home page using app.get() method. we only specify for/test it only respons to that.

// app.use("/hello",(req,res)=>{
//     res.send("hello from the hello route")
// });

// app.use( "/",(req,res)=>{
//     res.send("hello  from the homepage")
// });
// NOTE ON ROUTING IN EXPRESS:
// app.use() uses "prefix matching" and runs top-to-bottom. 
// app.use("/") will catch ALL incoming requests (like /test or /hello) 
// because every path starts with "/". 
// 
// FIX: Use app.get("/") for exact path matching, 
// OR place app.use("/") at the very bottom as a fallback.

// app.get("/user/:userid/:name/:pass",(req,res)=>{
//     //Dynamic route parameters are used to capture values from the URL and make them available in the req.params object. In this case, we have defined three dynamic route parameters: userid, name, and pass. When a request is made to this route with specific values for these parameters, they will be extracted from the URL and stored in the req.params object. We can then access these values and use them in our application logic. For example, if a request is made to /user/123/john/abc123, the req.params object will contain { userid: '123', name: 'john', pass: 'abc123' }.
//     console.log(req.params);
//     res.send({firstname:"affan",lastname:"mir"});
// });


// app.post("/user",(req,res)=>{
//     console.log(req.body);
//   res.send("data saved")
// });
// app.delete("/user",( req,res)=>{
//     res.send("data deleted");

// })


// app.get("/user",(req,res,next)=>{
// // this function is known as req handler.
// // res.send("hello from the user route 1");
// //     if (isAuthorized) {
// //         res.send("hello from the user route 1");
// //     } else {
// //         next(); // go to next handler
// //     }
// next(); // this will go to next handler function. if we dont call next() it will not go to next handler function. it will only execute the first handler function and then it will stop. so we have to call next() to go to next handler function.
// //    let isAuthorized = true; // replace with your own authorization logic
// },(req,res,next)=>{
// res.send("hello from the user route 2");
// next(); // this will go to next handler function. if we dont call next() it will not go to next handler function. it will only execute the first handler function and then it will stop. so we have to call next() to go to next handler function.
// },(req,res,next)=>{
// res.send("hello from the user route 3");
// next(); // this will go to next handler function. if we dont call next() it will not go to next handler function. it will only execute the first handler function and then it will stop. so we have to call next() to go to next handler function.
// },(req,res,next)=>{
// res.send("hello from the user route 4")
// next(); // this will go to next handler function. if we dont call next() it will not go to next handler function. it will only execute the first handler function and then it will stop. so we have to call next() to go to next handler function.
// });

// app.use("/",(req,res,next)=>{
//     // res.send("hello from the homepage");
//     next();
// });

// app.get("/user",(req,res,next)=>{
//     console.log("hello from the user route 1");
//     res.send("hello from the user route 1");
//     next();
// });
// app.get("/user",(req,res,next)=>{
//     console.log(req.params);
//     console.log("hello from the user route 2");
//     res.send("hello from the user route 2");
//     next();
// });

// app.get("/user",(req,res,next)=>{
//     console.log("hello from the user route 3");
//     res.send("hello from the user route 3");
//     next();
// }); 
// we use app.use middlewear so every get put post patch deldete request go through this.
app.use("/admin",authmiddleware); 
// app.use("/user",userauth);
app.get("/user",userauth,(req,res)=>{
    res.send("hello from the user route");
});
// middleware willnot run for this route because we have not specified the route /admin in the middleware. so this route will be executed without going through the middleware. so if we go to /user it will show hello from the user route but if we go to /admin/getalldata it will first go through the middleware and then it will execute the req handler function.
app.get("/admin/getalldata",(req,res)=>{
    // frist we have to check if request is authenticated or not.
    // logic fo checking if the request is authorized or not. if it is authorized then we will send the data otherwise we will send an error message.
res.send("All data sent");
});
app.get("/admin/deleteuser",(req,res)=>{
    // res.send("User deleted");
 res.send("User deleted");
});
app.listen(3000,()=>{
    console.log("server is runnning on port 3000");
    //this will only be printed when mys server is started successfully
});

//  we have created our server but it is not doing anything  yet.well do it in app.use()

//  in this we have a callback function this callback function will be executed when the server starts listening on the specified port. we can use this callback function to log a message to the console indicating that the server is running and listening for incoming requests. we can also use this callback function to perform any other initialization tasks that need to be done when the server starts.

//  wehn we run this our cursor is waiting and listening for incoming requests on port 3000. 
