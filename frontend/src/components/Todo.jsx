import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useEffect } from "react";

function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("ㅤ");
  const url = "https://todo-mern-app-l6ls.onrender.com/api/todo";


  useEffect(
    ()=>{
      getItem();
    },[]
  )

  function getItem() {
    fetch(url)
    .then((res)=>res.json())
    .then((res)=>setTodo(res))
  }

  async function handleSubmit() {
    if (!title.trim() || !description.trim()) {
      setMessage("⚠️ Both fields are required!");
      return;
    }

    try {
      setLoading(!loading)
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        setTodo((prev) => [...prev, { title, description }]);
        setTitle("");
        setDescription("");
        setMessage("✅ Successfully added the todo!");
      } else {
        setMessage("❌ Error in connecting to the API.");
      }
    } catch (error) {
      setMessage("❌ Fetch error. Please try again.");
    }
    finally{
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if(window.confirm("Click of to Delete the List"))
    {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setTodo((prev) => prev.filter((item) => item._id !== id));
        setMessage("✅ Message Deleted Successfully");
      } else {
        setMessage("❌ Failed to delete the message.");
      }
    } catch (error) {
      setMessage("❌ Error deleting the message. Please try again.");
      console.error("Delete error:", error);
    }
  }
  }

  if(message)
  {
    setTimeout(() => {
      setMessage("ㅤ")
    }, 5000);
  }

  return (
    <section className="TodoPage pt-4 max-w-lg mx-auto">
      <div className="TopPortion p-6  bg-white shadow-lg rounded-lg">
        <h1 className="text-center text-2xl font-bold mb-4">📝 Todo List</h1>

        {/* Message Display */}
        {message && (
          <p
            className={`text-center text-sm font-semibold mb-3 ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Input Fields */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter title..."
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter description..."
          />
          <button
            onClick={handleSubmit}
            className="p-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            {loading ? ("⌛ Submitting") : ("➕ Add Todo")}
          </button>
        </div>
      </div>

      {/* Todo List */}
      <div className="mt-5">
        {todo.length > 0 ? (
          todo.map((t, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-gray-100 rounded-md mb-2"
            >
              <div>
                <h2 className="font-semibold">{t.title}</h2>
                <p className="text-gray-600">{t.description}</p>
              </div>

              <div className="">
                <button
                  onClick={() => handleDelete(t._id)}
                  className="text-red-600 mx-3 hover:text-red-800 cursor-pointer"
                  >
                  <RiDeleteBin6Line size={20} />
                </button>
                {/* <button
                  // onClick={() => (index)}
                  className="text-yellow-600 hover:yellow-sky-800"
                  >
                  <FaRegEdit size={20} />
                </button> */}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">No todos yet! 🚀</p>
        )}
      </div>
    </section>
  );
}

export default Todo;
