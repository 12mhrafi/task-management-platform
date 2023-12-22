import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import ContainerArea from "../../Components/ContainerArea/ContainerArea";
import { Button, TextInput, Select, Textarea } from "flowbite-react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
const TaskEdit = () => {
    const axiosPublic = useAxiosPublic();
    const location = useLocation();
  
    const navigate = useNavigate();
  const [tasks] = useLoaderData();
  const {_id , title,description,priority,deadline} = tasks
  

  
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (data) {
      const updateItem = {
        title: data.title,
        deadline: data.deadline,
        description: data.description,
        priority: data.priority,
        }
        axiosPublic.put(`/updateTask/${_id}`, updateItem)
        .then(result => {
            if(result.status === 200){
                navigate(location?.state ? location?.state : "/")
                toast.success("update Success")
               
            }
        })
    }
         

  

  };
  return (
    <div>
      <ContainerArea>
        <div className="">
          <div className="">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex max-w-md flex-col mx-auto gap-4"
            >
              <div>
                <TextInput
                defaultValue={title}
                  {...register("title")}
                  type="text"
                  placeholder="Task Title"
                  required
                />
              </div>
              <div>
                <TextInput
                defaultValue={deadline}
                 type="date" {...register("deadline")} required
                  />
              </div>
              <div className="max-w-md">
                <Select {...register("priority")} required>
               
                    <option defaultValue={priority} >{priority}</option>
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                </Select>
              </div>
              <div className="max-w-md">
                <Textarea
                defaultValue={description}
                  {...register("description")}
                  placeholder="Description"
                  required
                  rows={4}
                />
              </div>
              <Button  type="submit">Update </Button>
            </form>
          </div>
        </div>
      </ContainerArea>
    </div>
  );
};

export default TaskEdit;
