import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Button, Label, TextInput } from "flowbite-react";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Register = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      // console.log(loggedUser);
      updateUserProfile(data.name, data.photo)
        .then(() => {
          toast.success("Register success!");
          navigate(location?.state ? location?.state : "/");
          reset();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <div className="s-top container mx-auto px-4">
      <div className="flex bg-gray-100 py-10 px-6 justify-center flex-col gap-4 md:w-[40%] mx-auto">
        <h2 className="text-2xl font-semibold">Register</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your Name" />
            </div>
            <TextInput
              type="text"
              {...register("name", { required: true })}
              placeholder="name"
            />
            <p className="mt-1">
              {" "}
              {errors.name && (
                <span className="text-red-400">This field is required</span>
              )}
            </p>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              type="email"
              {...register("email", { required: true })}
              placeholder="name@gmail.com"
            />
            <p className="mt-1">
              {" "}
              {errors.email && (
                <span className="text-red-400">This field is required</span>
              )}
            </p>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="photo" value=" Photo URL" />
            </div>
            <TextInput
              {...register("photo", { required: true })}
              type="text"
              placeholder="Your Photo URL"
            />
            <p className="mt-1">
              {" "}
              {errors.photo && (
                <span className="text-red-400">This field is required</span>
              )}
            </p>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              {...register("password", { required: true })}
            />
            <p className="mt-1">
              {" "}
              {errors.password && (
                <span className="text-red-400">This field is required</span>
              )}
            </p>
          </div>

          <Button className="bg-gray-600" type="submit">Submit</Button>
        </form>
        <div>
          <p>
            Already have an account?
            <Link to="/login">
              <span className="ml-2 text-gray-800 font-semibold hover:underline ">Login now </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;