const express = require('express');
const userrouter = express.Router();
const { userauth } = require("../middlewares/auth.js");
const Connectionrequest = require("../models/connectionrequest.js");

// the job of this api is get all the pending connection requests for the logged in user
userrouter.get("/user/requests/received", userauth, async (req, res) => {
  try {
    const loggedinuser = req.user;

    const data = await Connectionrequest.find({
      touserid: loggedinuser._id,
      status: "intrested"
    }).populate("fromuserid",["firstname","lastname","age","gender","skills"]);
    // we also have to dsiplay user ta here for that we can loop through fromuser id  and show them but thats a poor way good way is to build a relation between two tables or schemas
    //  now we are going to populate  the refrence whenever we are making a call to our db(connectionrequest)

    res.json({
      message: "data fetched successfully",
      data
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = userrouter;
