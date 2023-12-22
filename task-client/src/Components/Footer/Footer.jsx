import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import ContainerArea from "../ContainerArea/ContainerArea";
function FooterComponent() {
  return (
    <Footer container className="shadow-none">
      <ContainerArea>
        <div className="w-full">
         
            <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 sm:mt-4 ">
              <div>
                <Footer.Title title="about" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Task-management</Footer.Link>
                  <Footer.Link href="#">Rules</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Follow us" />
                <Footer.LinkGroup col>
                  <Footer.Link href="https://www.github.com">Github</Footer.Link>
                  <Footer.Link href="https://www.discord.com">Discord</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Legal" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Privacy Policy</Footer.Link>
                  <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Contact Us" />
                <Footer.LinkGroup col>
             
              <Footer.Icon href="https://www.instagram.com" icon={BsInstagram} />
              <Footer.Icon href="https://www.twitter.com" icon={BsTwitter} />
    
                </Footer.LinkGroup>
              </div>
   
            </div>
        
          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright href="#" by="Task management team™" year={2023} />
          </div>
        </div>
      </ContainerArea>
    </Footer>
  );
}

export default FooterComponent;
