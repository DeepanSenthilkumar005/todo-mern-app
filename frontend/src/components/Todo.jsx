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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        setTodo((prev) => [...prev, { title, description }]); // Proper state update
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
      <div className="InputField gap-4">
        <p className="mx-auto items-center text-xl font-bold">Add Item</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border md:w-2/5 md:me-3 w-full border-black rounded"
          placeholder="Title"
        />
        <input
          type="text"
          value={description} // Fixed variable name
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 my-4 border md:w-2/5 w-full border-black rounded"
          placeholder="Description"
        />
        <input
          type="button"
          onClick={handleSubmit}
          value="Submit"
          className="rounded-md md:w-1/5 w-full mx-auto border-black border p-2 cursor-pointer hover:bg-black bg-gradient-to-b from-blue-600 to-sky-500 hover:text-white"
        />

        {/* Displaying Todos */}
        {todo.map((t, index) => (
          <div key={index} className="TodoList rounded-md px-3 p-1 bg-black gap-2 m-1 text-white">
            <h1 className="font-bold">{t.title}</h1>
            <p className="ms-2">{t.description}</p> {/* Fixed variable name */}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Todo;
