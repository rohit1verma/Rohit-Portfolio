import Navbar from './components/Navbar'
import SplashCursor from './components/SplashCursor'
import Home from './sections/Home'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import IntroAnimation from './components/IntroAnimation'
import React from 'react'

const App = () => {
  const [introDone, setIntroDone] = React.useState(false);
  return (
    <>
    {!introDone && <IntroAnimation onFinish={()=>setIntroDone(true)}/>}

    {introDone && (
    <div className='relative gradient text-white'>
      <SplashCursor/>
      {/* <Particles/> */}
      <Navbar/>
      <Home/>
      <About/>
      <Experience/>
      <Skills/>
      <Projects/>
      
      <Testimonials/>
      <Contact/>
      <Footer/>
    </div>
    )}
    </>
  )
}

export default App