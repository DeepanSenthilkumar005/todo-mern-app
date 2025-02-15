import React, { useState } from "react";

function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todo, setTodo] = useState([]);

  async function handleSubmit() {
    if (!title.trim() || !description.trim()) {
      alert("Both fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/todo", {
        method: "POST",  // Corrected string format
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        setTodo([...todo, { title, description }]); // Properly updating state
        setTitle(""); // Clearing input fields
        setDescription("");
      } else {
        console.error("Error in connecting to the API");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  return (
    <section className="TodoPage p-4">
      <div className="InputField md:flex gap-4 justify-center">
        <p className="mx-auto items-center text-xl font-bold">Add Item</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border md:w-2/5 w-full border-black rounded"
          placeholder="Title"
        />
        <input
          type="text"
          value={des}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 my-4 border md:w-2/5 w-full border-black rounded"
          placeholder="Description"
        />
        <input
          type="button"
          onClick={handleSubmit}
          value="Submit"
          className="rounded-md w-full mx-auto border-black border p-2 cursor-pointer hover:bg-black bg-gradient-to-b from-blue-600 to-sky-500 hover:text-white"
        />

        {/* Displaying Todos */}
        {todo.map((t, index) => (
          <div key={index} className="TodoList rounded-md px-3 p-1 bg-black gap-2 m-1 text-white">
            <h1 className="font-bold">{t.title}</h1>
            <p className="ms-2">{t.des}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Todo;
