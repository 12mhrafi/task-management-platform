import React, { useContext } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, NavLink } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
import ContainerArea from "../ContainerArea/ContainerArea";
const NavBar = () => {
  const { user } = useUser();
  const { logoutUser } = useContext(AuthContext);

  const navLinks = (
    <>
      <NavLink
        to="/" 
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "  font-extrabold" : ""
        }
      >
        {" "}
        Home
      </NavLink>
      <NavLink
        to="/support"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "  font-extrabold" : ""
        }
      >
        {" "}
        Support
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "  font-extrabold" : ""
        }
      >
        {" "}
        Login
      </NavLink>
    </>
  );

  const handleLogOut = () => {
    logoutUser().then(() => {
      toast.success("logOut Success!");
    });
  };

  return (
    <ContainerArea>
      <Navbar fluid rounded>
        <Navbar.Brand href="/">
         
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Task Management
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img={user && user.photoURL} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
                {user && <span>{user.displayName}</span>}
              </span>
              <span className="block truncate text-sm font-medium">
                {user && <span>{user.email}</span>}
              </span>
            </Dropdown.Header>
  
            <Dropdown.Divider />
            <Dropdown.Item>
              {user ? (
                <Link onClick={handleLogOut}>Logout</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link className="flex gap-4 md:flex-row flex-col">{navLinks}</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </ContainerArea>
  );
};

export default NavBar;
