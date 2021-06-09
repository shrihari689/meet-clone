import link from "./../../assets/home_slider_link.svg";
import everyone from "./../../assets/home_slider_everyone.svg";
import plan from "./../../assets/home_slider_plan.svg";
import safe from "./../../assets/home_slider_safe.svg";
import { useEffect, useState } from "react";

const CONTENTS = [
    { image: link, title: "Get a link that you can share", desc: "Click New meeting to get a link that you can send to people that you want to meet with" },
    { image: everyone, title: "See everyone together", desc: "To see more people at the same time, go to Change layout in the More options menu" },
    { image: plan, title: "Plan ahead", desc: "Click New meeting to schedule meetings in Google Calendar and send invitations to participants" },
    { image: safe, title: "Your meeting is safe", desc: "No one can join a meeting unless invited or admitted by the host" }
]


const HomeCarousel = () => {

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSlide(prev => {
                if (prev === (CONTENTS.length - 1)) return 0;
                return prev + 1;
            })
        }, 3000)
        return () => {
            clearInterval(intervalId);
        }
    }, [])

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
                <img className="w-1/3 rounded-full object-cover" src={CONTENTS[currentSlide].image} alt="" />
                <span className="text-base mt-2 text-center">{CONTENTS[currentSlide].title}</span>
                <span className="text-gray-600 text-xs mt-2 px-10 md:px-32 text-center">{CONTENTS[currentSlide].desc}</span>
            </div>
            <div className="flex items-center mt-3">
                {
                    CONTENTS.map((_, id) => (
                        <div
                            key={id}
                            className={"w-2 h-2 mx-1 rounded-full " + (id === currentSlide ? "bg-indigo-700" : "bg-gray-300")}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default HomeCarousel;