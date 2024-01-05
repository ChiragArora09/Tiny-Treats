import AboutItem from "./AboutItem";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const About = () => {
  return (
    <div className="mt-10 bg-[#1a181e] border shadow-xl p-10 rounded-md">
      <div className="flex flex-col gap-8 justify-between my-8 lg:flex-row">
        <AboutItem
          imgsrc={"/delivery.svg"}
          heading={"Faster delivery"}
          subheading={"Delivery within 30-60 minutes (₹35 per order)"}
        />
        <AboutItem
          imgsrc={"/payment.svg"}
          heading={"Payment options"}
          subheading={"Cash on delivery"}
        />
        <AboutItem
          imgsrc={"/support.svg"}
          heading={"Customer Support"}
          subheading={"tsamarth.sam@gmail.com"}
        />
      </div>
      <div className="my-7 flex flex-col gap-2 items-center border-y border-gray-600 py-8">
        <p className="text-gray-300 font-extralight text-md">STORE DETAILS</p>
        <p className="text-white font-bold text-xl">Tiny Treats</p>
        <p className="text-sm text-gray-300 font-thin">
          Ganj Basoda, Madhya Pradesh 464221, India
        </p>
      </div>
      <div className="mb-10 flex flex-col gap-4 items-center">
        <p className="text-gray-300 font-extralight text-xl">FOLLOW US</p>
        <div className="text-white flex flex-col gap-2 items-start justify-center md:flex-row md:gap-6">
          <div className="flex items-center gap-1">
            <div>
              <FacebookIcon />
            </div>
            <span>Facebook</span>
          </div>
          <div className="flex items-center gap-1">
            <div>
              <InstagramIcon />
            </div>
            <span>Instagram</span>
          </div>
          <div className="flex items-center gap-1">
            <div>
              <YouTubeIcon />
            </div>
            <span>Youtube</span>
          </div>
          <div className="flex items-center gap-1">
            <div>
              <LinkedInIcon />
            </div>
            <span>LinkedIn</span>
          </div>
          <div className="flex items-center gap-1">
            <div>
              <TwitterIcon />
            </div>
            <span>Twitter</span>
          </div>
        </div>
      </div>
      <footer className="text-gray-300 text-xs text-center mt-16">
        &copy; 2024 All rights reserved
      </footer>
    </div>
  );
};

export default About;
