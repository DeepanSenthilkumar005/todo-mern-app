const { default: mongoose } = require('mongoose');
const todo = require('../models/msg')

// Adding the Data to the Server

//   /todo
exports.addmsg = async (req,res)=>{
    try {
        console.log(req.body);
        const newmsg = new todo(req.body);
        await newmsg.save();
        console.log("Data added");
        console.log(newmsg);
    } catch (error) {
        console.log("Data not added "+error);
    }
}

// Getting all the Data from the server
exports.findmsg = async (req,res) =>{
    try {
        const data = await todo.find({});
        console.log(data);
        res.json(data);
    } catch (error) {
        console.log('data not found '+error);
        
    }
}

// Delete the data from the server
exports.delmsg=async ()=>{
    try{
        // const del = todo.
    }
    catch{

    }
}