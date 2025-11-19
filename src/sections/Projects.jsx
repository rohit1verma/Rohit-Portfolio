import React, { useRef, useMemo } from "react";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import photo1 from "../assets/photo1.png";
import photo2 from "../assets/photo2.png";
import photo3 from "../assets/photo3.png";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

const useIsMobile = (query = "(max-width:639px)") => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  );
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);

    mql.addEventListener("change", handler);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return isMobile;
};

const Projects = () => {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);
  const projects = useMemo(
    () => [
      {
        title: "My Video Call",
        link: "https://my-video-call-ppvx.onrender.com",
        bgColor: "#0B192C",
        image: isMobile ? photo1 : img1,
      },
      {
        title: "RohitGPT",
        link: "https://rohitgpt.onrender.com",
        bgColor: "#1D1616",
        image: isMobile ? photo2 : img2,
      },
      {
        title: "AeroRide",
        link: "https://github.com/rohit1verma/Riding-application.git",
        bgColor: "#FFA4A4",
        image: isMobile ? photo3 : img3,
      },
    ],
    [isMobile]
  );

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });
  const thresholds = projects.map((_, i) => (i + 1) / projects.length);

  const [activeIndex, setActiveIndex] = React.useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v <= t);
    setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      ref={sceneRef}
      id='projects'
      className='relative text-white'
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className='sticky top-0 h-screen flex flex-col items-center justify-center'>
        <h1
          className={`relative text-center text-white text-3xl font-semibold tracking-[0.25ch] z-10 ${
            isMobile ? "mt-4" : "mt-8"
          }`}
        >
          MY WORK
          <span className='absolute inset-0 h-full w-12 rounded-[20%] bg-white/5 backdrop-invert animate-[move_2s_ease-in-out_infinite]'></span>
        </h1>
        <div
          className={`relative w-full flex-1 flex items-center justify-center ${
            isMobile ? "-mt-4" : ""
          }`}
        >
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeIndex === idx
                  ? "opacity-100 z-20"
                  : "opacity-0 z-0 sm:z-10"
              }`}
              style={{ width: "85%", maxWidth: "1200px" }}
            >
            

              <AnimatePresence mode='wait'>
                {activeIndex === idx && (
                  <motion.h3
                    key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`block text-center text-[clamp(2rem,6vw,5rem)] text-white/05 sm:absolute sm:-top-20 sm:left-[35%] lg:left-[-5%] sm:mb-0 italic font-semibold ${
                      isMobile ? "-mt-24" : ""
                    }`}
                    style={{
                      zIndex: 5,
                      textAlign: isMobile ? "center" : "left",
                    }}
                  >
                    {project.title}
                  </motion.h3>
                )}
              </AnimatePresence>

              <div className={`relative w-full overflow-hidden bg-black/20 shadow-2xl
                md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7) ${
                  isMobile ? "mb-6 rounded-lg" : "mb-10 sm:mb-12 rounded-xl"
                }
                h-[62vh] sm:h-[66vh]      
                `}
                style={{
                  zIndex:10,
                  transition:"box-shadow 250ms ease"
                }}
                >
                <img src={project.image}alt={project.title}
                className="w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl"
                style={{
                  position:"relative",
                  zIndex:10,
                  filter:"drop-shadow{0,16px 40px rgba(0,0,0,0.65)",
                  transition:"filter 200ms ease",
                }}
                loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0"
                style={{
                  zIndex:11,
                  background:"linear-gradient(100deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)"
                }}
                >

                </div>
              </div>
            </div>
          ))}
        </div>
       <div
  className={`absolute ${
    isMobile ? "bottom-20" : "bottom-10"
  }`}
>
  <a
    href={activeProject?.link}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`View ${activeProject?.title}`}
    className="border text-gray-50 duration-300 relative group cursor-pointer overflow-hidden h-16 w-48 rounded-md bg-neutral-800 p-2 font-extrabold hover:bg-[#456882] flex items-center justify-center"
  >
    <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150 duration-700 right-12 top-12 bg-yellow-500"></div>
    <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-12 h-12 rounded-full group-hover:scale-150 duration-700 right-20 -top-6 bg-orange-500"></div>
    <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-8 h-8 rounded-full group-hover:scale-150 duration-700 right-32 top-6 bg-pink-500"></div>
    <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-4 h-4 rounded-full group-hover:scale-150 duration-700 right-2 top-12 bg-red-600"></div>
    <p className="z-10 relative">View Project</p>
  </a>
</div>

      </div>
    </section>
  );
};

export default Projects;
