const { Timestamp } = require('mongodb');
const mongoose=require('mongoose');

const connectionrequestschema=new mongoose.Schema({
     fromuserid:{ 
        type:mongoose.Schema.Types.ObjectId, 
        ref:"user",
        // here we are doing what we are talking about in user.js line 15
        required:true
     },
     touserid:{
             type:mongoose.Schema.Types.ObjectId, 
             required:true
     },
      fromusername:{
          type:String,
          required:true
      },
      tousername:{
          type:String,
          required:true
      },
     status:{
        type:String,
        required:true,
        enum:{
            values:[ "accepted","ignored","rejected","intrested"],
            message: "{VALUE} is incorrect status type"
        }
        // we create enum wehn we  want user to restrict the values of a field to a specific set of values. in our case we want the status of connection request to be either "pending", "accepted" or "rejected". so we create an enum for status field.
     }

},
{
    timestamps:true
}
)
connectionrequestschema.index(
  { fromuserid: 1, touserid: 1 },
  { unique: true }
);
connectionrequestschema.index({
  touserid: 1,
  fromuserid: 1
});
 connectionrequestschema.pre("save",async function(){
    const connectionrequest=this;
    // here we are checking is fromuser id is same as to user id or not. if it is same then we are throwing an error because user cannot send connection request to himself.
    if(connectionrequest.fromuserid.toString()===connectionrequest.touserid.toString()){
        throw new Error("user cannot send connection request to himself");
    }
})
const  Connectionrequest=mongoose.model("connectionrequest",connectionrequestschema);
module.exports=Connectionrequest;