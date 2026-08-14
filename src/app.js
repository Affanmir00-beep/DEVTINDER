const express=require('express');
//const app=express(); it mrans we are creatin our node application this is instance of express js application. we are basically creating a new web server using express js framework. we can use this app variable to create routes, middleware, and other functionalities of our web application. we have to call listen on this app variable to start the server and listen for incoming requests on a specific port.
const app=express();

app.use( "/",(req,res)=>{
    res.send("hello  from the homepage")
});

// this function is known as req handler function. it takes two parameters req and res. req is the request object that contains information about the incoming request, such as the HTTP method, headers, and body. res is the response object that we can use to send a response back to the client. in this case we are sending a simple text response "hello from the server" using the send method of the response object.
//  wehn  we do this and open localhost:3000 in the browser we will see hello from the server printed on the screen. this is basically responding to that incoming request. this is because our server is listening for incoming requests on port 3000 and when we make a request to that port, our req handler function is executed and sends the response back to the client.


// if we go to localhost:3000/hello localhost:3000/hey it will always show hello from the server because we have not specified any route in our req handler function.  whatever req come in we have send hello from the server. we can specify a route using app.get() or app.post() methods.  

app.use("/test",(req,res)=>{
    res.send("hello from the test route")
});
//  now if we go to any other route it show cannnot get but if we go to /test it show response hello from the test route. this is because we have specified a route /test in our req handler function. so when we make a request to that route, our req handler function is executed and sends the response back to the client.

// itlll not even show anything on homepage because we have not specified any route for home page. we can specify a route for home page using app.get() method. we only specify for/test it only respons to that.

app.use("/hello",(req,res)=>{
    res.send("hello from the hello route")
});


// NOTE ON ROUTING IN EXPRESS:
// app.use() uses "prefix matching" and runs top-to-bottom. 
// app.use("/") will catch ALL incoming requests (like /test or /hello) 
// because every path starts with "/". 
// 
// FIX: Use app.get("/") for exact path matching, 
// OR place app.use("/") at the very bottom as a fallback.


app.listen(3000,()=>{
    console.log("server is runnning on port 3000");
    //this will only be printed when mys server is started successfully
});

//  we have created our server but it is not doing anything  yet.well do it in app.use()

//  in this we have a callback function this callback function will be executed when the server starts listening on the specified port. we can use this callback function to log a message to the console indicating that the server is running and listening for incoming requests. we can also use this callback function to perform any other initialization tasks that need to be done when the server starts.

//  wehn we run this our cursor is waiting and listening for incoming requests on port 3000. 
