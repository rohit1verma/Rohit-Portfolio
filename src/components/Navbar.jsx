import React,{useState,useRef, useEffect} from 'react'
import OverlayMenu from './OverlayMenu'
import Logo from '../assets/Logo.png'
import { FiMenu } from "react-icons/fi";
import styled from 'styled-components'; 

const Button = () => {
  return (
    <StyledWrapper>
      <a
        href="#contact"
        role="button"
        aria-label="Go to contact section"
        className="gradient-button"
      >
        <span className="gradient-text">Reach Out</span>
      </a>
    </StyledWrapper>
  );
}


const StyledWrapper = styled.div`
  .gradient-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2; /* keep text above pseudo elements */
    padding: 10px 25px;
    font-size: 18px;
    font-weight: 700;
    color: white;
    background: transparent;
    text-decoration: none;
    border: none;
    cursor: pointer;
    border-radius: 50px;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .gradient-button:hover {
    transform: scale(1.03);
  }

  .gradient-button:focus-visible {
    outline: none;
    box-shadow: 0 0 0 6px rgba(79, 70, 229, 0.12);
    transform: scale(1.02);
  }

  .gradient-button::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      #ff6b6b,
      #4ecdc4,
      #45b7d1,
      #96ceb4,
      #feca57,
      #ff9ff3,
      #ff6b6b
    );
    z-index: 0; 
    filter: blur(10px);
    transform: rotate(0deg);
    transition: transform 1.5s ease-in-out, opacity 0.3s;
    opacity: 1;
    pointer-events: none;
  }

  .gradient-button:hover::before {
    transform: rotate(180deg);
  }

  .gradient-button::after {
    content: "";
    position: absolute;
    inset: 3px;
    background: rgba(0,0,0,0.85);
    border-radius: 47px;
    z-index: 1; /* sits above the colourful glow but below the text */
    filter: blur(4px);
    pointer-events: none;
  }

  .gradient-text {
    display: inline-block;
    position: relative;
    z-index: 2;
    color: transparent;
    background: conic-gradient(
      from 0deg,
      #ff6b6b,
      #4ecdc4,
      #45b7d1,
      #96ceb4,
      #feca57,
      #ff9ff3,
      #ff6b6b
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: hue-rotate(0deg);
    transition: filter 0.3s linear;
    white-space: nowrap;
  }

  .gradient-button:hover .gradient-text {
    animation: hue-rotating 2s linear infinite;
  }

  .gradient-button:active {
    transform: scale(0.99);
  }

  @keyframes hue-rotating {
    to {
      filter: hue-rotate(360deg);
    }
  }

  
  @media (prefers-reduced-motion: reduce) {
    .gradient-button,
    .gradient-button::before,
    .gradient-button::after,
    .gradient-text {
      transition: none !important;
      animation: none !important;
    }
  }
`;

const Navbar = () => {
  const[menuOpen, setMenuOpen] = useState(false)
  const[visible, setVisible] = useState(true)
  const[forceVisible, setForceVisible] = useState(false)

  const lastScrollY = useRef(0);
  const timerId = useRef(null);

  useEffect(()=>{
    const homeSection = document.querySelector("#home");
    const observer = new IntersectionObserver(
    ([entry])=>{
      if(entry.isIntersecting){
        setForceVisible(true);
        setVisible(true);
      }else{
        setForceVisible(false);
      }
    },{threshold : 0.1}
  )
  if(homeSection) observer.observe(homeSection);
  return ()=>{
    if(homeSection) observer.unobserve(homeSection);
  }
  },[])

  useEffect(()=>{
    const handleScroll = ()=>{
      if(forceVisible){
        setVisible(true);
        return;
      }
      const currentScrollY = window.scrollY;
      if(currentScrollY>lastScrollY.current){
        setVisible(false);
      }else{
        setVisible(true);
        if(timerId.current) clearTimeout(timerId.current);
        timerId.current = setTimeout(()=>{
          setVisible(false);
        },3000)
      }
      lastScrollY.current = currentScrollY;
    }
    window.addEventListener("scroll", handleScroll, {passive:true});
    return ()=>{
      window.removeEventListener("scroll", handleScroll);
      if(timerId.current) clearTimeout(timerId.current);
    }
  },[forceVisible])

  return (
    <>
    <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
    <div className='flex items-center space-x-2' >
      <img src={Logo} alt="logo" className='w-10 h-10' />
      <div className='text-2xl font-bold text-white hidden sm:block'>Rohit</div>
    </div>
    <div className='block lg:absolute lg:left-1/2 lg:tranform lg:-translate-x-1/2'>
    <button onClick={()=>setMenuOpen(true)} className='text-white text-3xl focus:outline-none' aria-label="open menu" >
      <FiMenu />
    </button>
    </div>
    <div className='hidden lg:block'>
      <Button />
    </div>
    </nav>
    <OverlayMenu isOpen = {menuOpen} onClose={()=> setMenuOpen(false)}/>
    </>
  )
}

export default Navbar