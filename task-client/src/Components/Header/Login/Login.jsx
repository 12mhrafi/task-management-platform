import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Button, Label, TextInput } from "flowbite-react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);

  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const handleGoogleLogin = () => {
    googleLogin().then((result) => {
      const signedUser = result.user;
      if (signedUser) {
        toast.success("Login Success!");
        navigate(location?.state ? location?.state : "/");
      }
    });
  };

  const onSubmit = (data) => {
    // console.log(data);
    loginUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      //   console.log(loggedUser);
      if (loggedUser) {
        toast.success("Login success!");
        navigate(location?.state ? location?.state : "/");
      }
    });
  };
  return (
    <div>
      <div className=" s-top container mx-auto px-4">
        <div className="flex bg-gray-100  py-10 px-6 justify-center flex-col gap-4 md:w-[40%] mx-auto">
          <h2 className="text-2xl font-semibold">Login</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-4"
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput
                className="border-none outline-none"
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

            <Button className="bg-gray-600" type="submit">
              Submit
            </Button>
          </form>
          <div>
            <p>
              Don't have an account?
              <Link to="/register">
                <span className="ml-2 text-gray-800 font-semibold hover:underline">
                  Register now{" "}
                </span>
              </Link>
            </p>
          </div>
          <Button className="bg-gray-600" onClick={handleGoogleLogin}>
            Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
