const { default: mongoose } = require('mongoose');
const todo = require('../models/msg')

// Adding the Data to the Server

//   /todo
exports.addmsg = async (req, res) => {
    try {
        console.log(req.body);
        const newmsg = new todo(req.body);
        await newmsg.save();
        console.log("Data added:", newmsg);

        // ✅ Send a response back to the frontend
        res.status(201)
        .json({ message: "Todo added successfully", todo: newmsg });
    } catch (error) {
        console.error("Data not added:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


// Getting all the Data from the server
exports.findmsg = async (req,res) =>{
    try {
        const data = await todo.find({});
        console.log(data);
        res.json(data);
    } catch (error) {
        console.log('data not found '+error);
        res.status(500).json({ error: "Internal Server Error" });
        
    }
}

// Delete the data from the server
exports.delmsg = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTodo = await todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: "❌ Todo not found" });
        }

        res.status(202).json({ message: "✅ Todo deleted successfully" });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ message: "❌ Server error. Please try again." });
    }
};
