import React, { useContext } from "react";
import ContainerArea from "../../Components/ContainerArea/ContainerArea";
import { MdDelete } from "react-icons/md";
import { Button, TextInput, Select, Textarea } from "flowbite-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import useTask from "../../hooks/useTask";
import { FaEdit } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
const Dashboard = () => {
  const location = useLocation();
  console.log(location);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [tasks, refetch] = useTask();
  // console.log(tasks);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (data) {
      const taskItem = {
        title: data.title,
        deadline: data.deadline,
        description: data.description,
        priority: data.priority,
        email: user?.email,
        status: "todo",
      };

      axiosPublic.post("/createTask", taskItem).then((result) => {
        if (result) {
          if (result.status === 200) {
            toast.success("task added");
            refetch();
          }
        }
      });
      // console.log(taskItem)
    }
  };

  const progress = tasks.filter((task) => task.status === "progress");
  const completed = tasks.filter((task) => task.status === "completed");
  const todos = tasks.filter((task) => task.status === "todo");

  //delete todo
  const handleDeleteTodo = (id) => {
    axiosPublic.delete(`/todoDelete/${id}`).then((res) => {
      console.log(res);
      if (res.statusText === "OK") {
        toast.success("Todo Task deleted");
        refetch();
      }
    });
  };

  // add to progress

  const handleProgress = (id) => {
    axiosPublic.patch(`/addToProgress/${id}`).then((res) => {
      if (res) {
        toast.success("add to progress");
        refetch();
      }
    });
  };
  // handle complete

  const handleComplete = (id) => {
    axiosPublic.patch(`/TaskCompleted/${id}`).then((res) => {
      if (res) {
        toast.success("task completed!");
        refetch();
      }
    });
  };

  // handle Edit 


  return (
    <ContainerArea>
      <div className="">
        <div className="">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex max-w-md flex-col mx-auto gap-4"
          >
            <div>
              <TextInput
                {...register("title")}
                type="text"
                placeholder="Task Title"
                required
              />
            </div>
            <div>
              <TextInput type="date" {...register("deadline")} required />
            </div>
            <div className="max-w-md">
              <Select {...register("priority")} required>
                <option value={"Select options"} hidden>
                  Select options
                </option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </Select>
            </div>
            <div className="max-w-md">
              <Textarea
                {...register("description")}
                placeholder="Description"
                required
                rows={4}
              />
            </div>
            <Button type="submit">Create Task </Button>
          </form>
        </div>
      </div>
      <div>
        <div className=" mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <h2 className="text-xl font-bold">New Task ({todos.length})</h2>
            <div>
              <di>
                {todos.map((todo) => (
                  <div
                    key={todo._id}
                    className="py-4 hover:bg-gray-200 duration-500"
                  >
                    <div className="flex justify-between">
                      <h3 className="font-semibold ">{todo?.title}</h3>{" "}
                      <span className="text-blue-700 font-semibold">
                        {"todo"}
                      </span>
                    </div>
                    <p className="mt-3">{todo.description}</p>
                    <div className="flex gap-5 mt-3 justify-between items-center">
                      <p>Deadline: {todo.deadline} </p>
                      <p>
                        Priority:{" "}
                        <span className="font-bold ">{todo.priority}</span>
                      </p>
                      <button onClick={() => handleDeleteTodo(todo._id)}>
                        <MdDelete className="text-2xl  hover:opacity-35 duration-500 text-red-600" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                    <Button
                      onClick={() => handleProgress(todo._id)}
                      className="mt-3"
                    >
                      Add to progress
                    </Button>
                    <Link to={`/taskEdit/${todo._id}`} state={location?.pathname}> <FaEdit className="text-xl text-green-500 hover:opacity-35 duration-500"></FaEdit> </Link>
                    </div>
                    <hr className="mt-3" />
                  </div>
                ))}
              </di>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">
              {" "}
              Progressing Task ({progress.length})
            </h2>
            <div>
              <div className="  ">
                {progress.map((todo) => (
                  <div
                    key={todo._id}
                    className="py-4 hover:bg-gray-200 duration-500"
                  >
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{todo?.title}</h3>{" "}
                      <span className="text-red-700 font-semibold">
                        {todo.status}
                      </span>
                    </div>
                    <p className="mt-3">{todo.description}</p>
                    <div className="flex gap-5 mt-3">
                      <p>Deadline: {todo.deadline} </p>
                      <p>
                        Priority:{" "}
                        <span className="font-bold text-red-600">
                          {todo.priority}
                        </span>
                      </p>
                    </div>
                    <Button
                      onClick={() => handleComplete(todo._id)}
                      className="mt-3"
                    >
                      Add to completed
                    </Button>
                    <hr className="mt-3" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">
              Completed Task ({completed.length})
            </h2>
            <div>
              <div className="  ">
                {completed.map((todo) => (
                  <div
                    key={todo._id}
                    className="py-4 hover:bg-gray-200 duration-500"
                  >
                    <div className="flex justify-between">
                      <h3 className="font-semibold ">{todo?.title}</h3>{" "}
                      <span className="text-green-600 font-semibold">
                        {todo.status}
                      </span>
                    </div>
                    <p className="mt-3">{todo.description}</p>
                    <div className="flex gap-5 mt-3">
                      <p>Deadline: {todo.deadline} </p>
                      <p>
                        Priority:{" "}
                        <span className="font-bold text-red-600">
                          {todo.priority}
                        </span>
                      </p>
                    </div>
                    <hr className="mt-3" />
                  </div>
                ))}
              </div>
         
            </div>
          </div>
      
        </div>
        <div>
                <h2 className="text-xl font-bold">Who are using this website?</h2>
                <div>
                    <div className="grid md: grid-cols-3 lg:grid-cols-4 ">
                        <div className="py-4">
                              <h3 >Developer</h3>
                        </div>
                        <div className="py-4">
                              <h3>Bankers</h3>
                        </div>
                        <div className="py-4">
                              <h3>Students</h3>
                        </div>
                        <div className="py-4">
                              <h3>Graphic desingner</h3>
                        </div>
                       
                    </div>
                </div>
              </div>
      </div>
    </ContainerArea>
  );
};

export default Dashboard;
