import React from "react";
import ContainerArea from "../../Components/ContainerArea/ContainerArea";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import bannerImg from "../../../src/assets/banner.jpg";
const Banner = () => {
  return (
    <ContainerArea>
      <div className=" h-[100vh]">
        <div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5 justify-center items-center">
            <div className="flex flex-col gap-7">
            
                <h2 className="lg:text-6xl md:text-5xl text-3xl  font-bold text-cyan-700">
                  Best way to <br /> Manage your <br /> Daily Task{" "}
                </h2>
                <p>
                  Task management is the practice of tracking a task through to
                  completion. Most people do some type of task management,
                  without thinking about it, every day.
                </p>
                <Link to="/dashboard">
                <Button>Let's Explore</Button>
              </Link>
            </div>
            <div className="w-full h-full">
              <img
                className="h-full w-full mr-0 object-cover object-center"
                src={bannerImg}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </ContainerArea>
  );
};

export default Banner;
