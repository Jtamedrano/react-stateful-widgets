import React, { useState } from "react";
import shortid from "shortid";

class TodoItem {
  constructor(todoItem) {
    this.todoId = shortid.generate();
    this.task = todoItem;
    this.todoComplete = false;
  }
}

export default function Todo() {
  const [todoList, setTodoList] = useState([]);

  const addToList = (todoInputString) => {
    const todo = new TodoItem(todoInputString);
    setTodoList([...todoList, todo]);
  };

  const completeTask = (inputId, updatedStatus) => {
    let ammendedList = [...todoList];
    for (let i in ammendedList) {
      if (ammendedList[i].todoId === inputId) {
        ammendedList[i].todoComplete = updatedStatus;
      }
    }
    setTodoList(ammendedList);
  };

  const deleteFromList = (id) => {
    setTodoList(
      [...todoList].filter((e) => {
        return e.todoId != id;
      })
    );
  };

  console.log(todoList);

  return (
    <div className="widget-input container">
      <h2>Todos</h2>

      {/* Input Todo */}
      <TodoInput addToList={(i) => addToList(i)} />
      {/* List Todos */}
      <div className="todoList" style={{ minWidth: "25%" }}>
        {todoList.map((e) => {
          const id = e.todoId;

          const pStyle = {
            textDecoration: e.todoComplete ? "line-through" : "none",
          };

          return (
            <div
              className="todoItem"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
              key={id}
            >
              <p
                style={pStyle}
                onClick={() => {
                  completeTask(id, !e.todoComplete);
                }}
              >
                {e.task}
              </p>
              <button
                id={`btn-${id}`}
                value={id}
                onClick={(e) => {
                  deleteFromList(e.target.value);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TodoInput({ addToList }) {
  const [input, setInput] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addToList(input);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} style={{ marginBottom: "1em" }}>
      <input
        type="text"
        value={input}
        onChange={(i) => setInput(i.target.value)}
      />
      <input type="submit" />
    </form>
  );
}
