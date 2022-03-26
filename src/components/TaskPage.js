import React, { useState, useEffect } from "react";
import "../index.css";

const getLocalItem = () => {
  let list = localStorage.getItem("lists");
  console.log(list);
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};
const TaskPage = () => {
  const [text, setText] = useState("");
  const [task, setTask] = useState(getLocalItem());

  const changeText = (e) => {
    setText(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (text === "") {
      alert("Please enter a task");
    } else {
      setTask([...task, text]);
    }

    setText("");
  };
  const removeTask = (a) => {
    const finalData = task.filter((curEle, index) => {
      return index !== a;
    });

    setTask(finalData);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(task));
  }, [task]);

  const removeAll = () => {
    setTask([]);
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center main-row">
          <div className="col shadow main-col bg-white col-md-6 main-list">
            <div className="row bg-primary text-white">
              <div className="col p-2">
                <h4 className="text-center">What else need to be done ?</h4>
              </div>
            </div>
            <form onSubmit={submitHandler}>
              <div className="row justify-content-between text-white p-2">
                <div className="form-group flex-fill mb-2 col-9">
                  <input
                    id="todo-input"
                    type="text"
                    className="form-control"
                    value={text}
                    onChange={changeText}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mb-2 ml-2 col-3"
                >
                  Add Task
                </button>
              </div>
            </form>

            <div className="container">
              <div className="row">
                {task.map((value, index) => {
                  return (
                    <>
                      <div className="col-9 my-2" key={index}>
                        {value}
                      </div>
                      <div className="col-3 my-2">
                        <button
                          onClick={() => removeTask(index)}
                          className="btn btn-outline-secondary"
                        >
                          Remove Task
                        </button>
                      </div>
                    </>
                  );
                })}
                <button onClick={removeAll} className="btn btn-outline-danger">
                  Remove all
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskPage;
