import { Button } from "@/components/ui/button";
import search from "../assets/search.png";
import elearning from "../assets/elearning.png"
import signup from "../assets/signup.png";
import footerbox from "../assets/footerbox.png";
import FooterBox from "./footerbox";
const HowItWorks = () => {
    return (
      <div className="bg-slate-200 w-full min-h-full font-Space Grotesk flex flex-col items-center justify-center p-8">
        <div className="align items-center"></div>
        <h1 className="text-5xl font-bold mt-48 text-center">How it Works?</h1>
        <span className="px-40 text-center mt-8">
            Kaabil.me is a self-learning platform designed to keep you engaged and motivated. Our platform tailors courses to your unique learning style, ensuring that you stay interested and make consistent progress. With Kaabil.me, you get personalized content that adapts to your needs, making learning more effective and enjoyable. The platform includes interactive quizzes and real-world projects that reinforce your knowledge. Join Kaabil.me today and experience a new way of learning that’s tailored just for you.
        </span>
        <div className="flex flex-row p-16 justify-center space-x-16">
            <div className="flex flex-col justify-center items-center text-center space-y-4">
                <img src={signup} className="h-40 w-40" alt="signup" />
                <Button className="rounded-full">1</Button>
                <h1 className="text-2xl text-slate-800">Create Account</h1>
                <span>Condimentum ultricies in imperdiet viverra massa. Non ac varius a ornare posuere sed placerat sed.</span>
            </div>
            <div className="flex flex-col justify-center items-center text-center space-y-4">
                <img src={search} className="h-40 w-40" alt="signup" />
                <Button className="rounded-full">2</Button>
                <h1 className="text-2xl text-slate-800">Create Account</h1>
                <span>Condimentum ultricies in imperdiet viverra massa. Non ac varius a ornare posuere sed placerat sed.</span>
            </div>
            <div className="flex flex-col justify-center items-center text-center space-y-4">
                <img src={elearning} className="h-40 w-40" alt="signup" />
                <Button className="rounded-full">3</Button>
                <h1 className="text-2xl text-slate-800">Create Account</h1>
                <span>Condimentum ultricies in imperdiet viverra massa. Non ac varius a ornare posuere sed placerat sed.</span>
            </div>
        </div>
        {/* <div className="flex flex-row p-16 justify-center space-x-16 relative z-50">
        <h1 className="text-white font-bold text-3xl">Start Learning Today</h1>
      </div> */}
      {/* Add extra space at the bottom */}
      <div className="h-16"></div>
      </div>
    );
};

export default HowItWorks;
