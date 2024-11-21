/* eslint-disable react/prop-types */
import { FiArrowUpRight } from "react-icons/fi";
import {motion, useScroll, useTransform} from "framer-motion"
import { useRef } from "react";


/* TextParallaxContentExample */
function App() {

  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Collaborate"
        heading="Built for all of us."
      >
        {/* the content inside the TextParallax is going bellow the sticky image and does not have its sticky effects */}
        <ExampleContent/>
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Quality"
        heading="Never compromise."  
      >
        <ExampleContent/>
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Modern"
        heading="Dress for the best."
      >
        <ExampleContent/>
      </TextParallaxContent>
    </div>
  )
}

export default App

/* standard padding */
const IMG_PADDING = 12;

function TextParallaxContent({imgUrl, subheading, heading, children}){
  return(
    /* this is just a container for the image, if you change the imgs h to 50vh you can see that the image starts at the top it goes down with the screen until the conteiner ends */
    <div /* className="bg-orange-500 mb-[500px]" */ 
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl}/>
        {/* while the image is sticky the text on the image is absolute, so it will go along with the div*/}
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  )
}

function StickyImage({imgUrl}){
  const targetRef = useRef(null)
  /* this hook will track the position of targetRef through the screen and will report back a value between 0 and 1 (how far that element is through the screen) */
  const {scrollYProgress} = useScroll({
    target: targetRef,
    /* controls for where the animation starts and how it goes, need to research later */
    offset: ["end end", "end start"]
  })

  /* we are changing the scale of the image depending on where it is on the screen */
  const scale = useTransform(scrollYProgress, [0,1], [1, 0.85])

  /* we are changing the opacity of the image depending on where it is on the screen */
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0.75, 0])

  return(
    /* by using display: sticky we can make the image stick to the screen while its parent conteiner is still being displayed */
    <motion.div style={{
      backgroundImage: `url(${imgUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: `calc(100vh - ${IMG_PADDING * 2}px)`,
      top: IMG_PADDING,
      scale
    }}
      className="sticky z-0 overflow-hidden rounded-3xl"
      ref={targetRef}
    >
      <motion.div className="absolute inset-0 bg-neutral-950/70" style={{opacity}} />
    </motion.div>
  )
}

function OverlayCopy({heading, subheading}){
  const targetRef = useRef(null)
  /* this hook will track the position of targetRef through the screen and will report back a value between 0 and 1 (how far that element is through the screen) */
  const {scrollYProgress} = useScroll({
    target: targetRef,
    /* controls for where the animation starts and how it goes */
    offset: ["start end", "end start"]
  })

  /* this will make our image scroll independently from the image */
  const y = useTransform(scrollYProgress, [0, 1], [250, -250])
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0])

  return(
    <motion.div className="absolute left-0 top-0 flex flex-col items-center justify-center text-white h-screen w-full" style={{y, opacity}} ref={targetRef}>
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">{subheading}</p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  )
}

const ExampleContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Additional content explaining the above card here
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
        blanditiis soluta eius quam modi aliquam quaerat odit deleniti minima
        maiores voluptate est ut saepe accusantium maxime doloremque nulla
        consectetur possimus.
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        reiciendis blanditiis aliquam aut fugit sint.
      </p>
      <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
        Learn more <FiArrowUpRight className="inline" />
      </button>
    </div>
  </div>
);

