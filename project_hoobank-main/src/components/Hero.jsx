// main home tab content
import styles from "../style";
import { discount, robot, } from "../assets";
import ImageUrl from '../assets/Image.png';
import GetStarted from "./GetStarted";
// import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div>
          {/* <img src={discount} alt="discount" className="w-[32px] h-[32px]" /> */}
          {/* <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">20%</span> Discount For{" "}
            <span className="text-white">1 Month</span> Account
          </p> */}
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            {/* We <br className="sm:block hidden" />{" "} */}
            <span className="text-gradient">Code Flame Squad</span>{" "}
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0"
           onClick={() => window.location.href = 'https://www.youtube.com'}>
            <GetStarted />
          </div>
        </div>

        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
          Welcomes you.
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Welcome to Code Flame Squad, a team of innovative college students. We're passionate about harnessing the power of Artificial Intelligence to revolutionize the way interviews are conducted. Our project aims to create a website that utilizes AI-driven technology to facilitate seamless and efficient interviews.
        </p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={ImageUrl} alt="AI interview" className="w-[100%] h-[100%] relative z-[5]" />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`} >
        <GetStarted />
      </div>
    </section>
  );
};

export default Hero;
