import React, { useRef, useEffect, useState } from 'react';
import Background from './Background';
import { FaJenkins, FaGitAlt , FaDocker, FaJava, FaPython, FaDatabase, FaReact } from 'react-icons/fa';
import { IoLogoJavascript } from "react-icons/io5";
import { SiKubernetes, SiPostgresql, SiCplusplus, SiTailwindcss, SiMongodb, SiAmazons3, SiSpringboot, SiApachekafka } from "react-icons/si";
import { FaGear } from "react-icons/fa6";
import { DiRedis } from "react-icons/di";
import emailjs from '@emailjs/browser';

// Main App Component
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const timeRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [particlesCount, setParticlesCount] = useState(10000);
  const [particleMeshRadius, setParticleMeshRadius] = useState(10);

  useEffect(() => {
    // Disable scrolling initially
    if (!isClicked) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isClicked]);

  const handleFirstClick = () => {
    setIsClicked(true);
  };
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSection = (sectionId, scrollAlignment = 'start') => {
    setActiveSection(sectionId);
    const section = document.getElementById(sectionId);
  
    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const navBarHeight = document.querySelector('nav')?.offsetHeight || 0; 
  
      let scrollPosition;
      switch (scrollAlignment) {
        case 'start':
          scrollPosition = sectionTop;
          break;
        case 'center':
          scrollPosition = sectionTop - (window.innerHeight / 2) + (section.offsetHeight / 2);
          break;
        case 'end':
          scrollPosition = sectionTop - window.innerHeight + section.offsetHeight;
          break; 
        default:
          scrollPosition = sectionTop;
          break;
      }
  
      window.scrollTo({
        top: scrollPosition - navBarHeight,
        behavior: 'smooth',
      });
    }
  
    setMenuOpen(false);
  };

  useEffect(() => {
    // Update the time every second
    const intervalId = setInterval(() => {
      if (timeRef.current) {
        timeRef.current.textContent = new Date().toLocaleString("en-US", {
          dateStyle: "full",
          timeStyle: "medium",
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div onClick={handleFirstClick} className="relative">
      <Background isExpanded={isExpanded} setIsExpanded={setIsExpanded} particlesCount={particlesCount} particleMeshRadius={particleMeshRadius} />  
      {
        !isClicked &&
        !isExpanded && (
        <div className={`fixed inset-0 bg-gray-900 text-white flex items-center justify-center z-4`}>
          <TypewriterHeader texts={[ "Click To Enter.", 
                    "I know the particles \nlook cool.", 
                    "I spent a lot of \ntime trying to make\nthem perfect.",
                    "I'm glad you \nlike them.",
                    "I hope you \nlike the website.",
                    "I hope you \nlike my work.",
                    // "I hope you \nlike me.",
                    "You can click now.",
                    "Kinda weird \nyou still \nhaven't clicked.",
                    "....." ]}/>
        </div>
        )
      }

      {
        isClicked && 
        !isExpanded && (
        <div className={`fixed inset-0 bg-gray-900 text-white flex items-center justify-center z-4`}>
          <TypewriterHeader texts={[ "Entering..."]} minSpeed={25} maxSpeed={25} lastTextSpeed={25} pauseTime={2000} repeat={false} />
        </div>
        )
      }

    {  
      isExpanded && (
      <div className={`flex flex-col min-h-screen bg-gray-900 text-white`}>
        <div className={`z-10 ${isExpanded ? '' : 'hidden'}`}>
        {/* Navigation */}
        <nav className={`fixed w-full bg-gray-900/90 z-50 shadow-md slide-in`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <div className="pl-10 hidden md:block" ref={timeRef}></div>
              <div className="text-xl font-bold">Michael Karb</div>
              
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button 
                  onClick={toggleMenu}
                  className="text-white focus:outline-none"
                >
                  {menuOpen ? 'Close' : 'Menu'}
                </button>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                <button onClick={() => scrollToSection('home')} className={`transition ${activeSection === 'home' ? 'text-blue-400' : 'hover:text-blue-300'}`}>Home</button>
                <button onClick={() => scrollToSection('about')} className={`transition ${activeSection === 'about' ? 'text-blue-400' : 'hover:text-blue-300'}`}>About</button>
                <button onClick={() => scrollToSection('projects')} className={`transition ${activeSection === 'projects' ? 'text-blue-400' : 'hover:text-blue-300'}`}>Projects</button>
                <button onClick={() => scrollToSection('skills')} className={`transition ${activeSection === 'skills' ? 'text-blue-400' : 'hover:text-blue-300'}`}>Skills</button>
                <button onClick={() => scrollToSection('contact')} className={`transition ${activeSection === 'contact' ? 'text-blue-400' : 'hover:text-blue-300'}`}>Contact</button>
              </div>
            </div>
            
            {/* Mobile Navigation */}
            {menuOpen && (
              <div className="md:hidden bg-gray-800 py-2">
                <div className="flex flex-col space-y-3 px-4 pb-3">
                  <button onClick={() => scrollToSection('home')} className={`text-left ${activeSection === 'home' ? 'text-blue-400' : ''}`}>Home</button>
                  <button onClick={() => scrollToSection('about')} className={`text-left ${activeSection === 'about' ? 'text-blue-400' : ''}`}>About</button>
                  <button onClick={() => scrollToSection('projects', 'start')} className={`text-left ${activeSection === 'projects' ? 'text-blue-400' : ''}`}>Projects</button>
                  <button onClick={() => scrollToSection('skills')} className={`text-left ${activeSection === 'skills' ? 'text-blue-400' : ''}`}>Skills</button>
                  <button onClick={() => scrollToSection('contact')} className={`text-left ${activeSection === 'contact' ? 'text-blue-400' : ''}`}>Contact</button>
                </div>
              </div>
            )}
            <div className="slider-wrapper">
              <div>
                <Slider text={"Particles Count"} min={0} max={100000} value={particlesCount} setValue={setParticlesCount}/>
              </div>  
              <div>
                <Slider text={"Radius"} min={1} max={50} value={particleMeshRadius} setValue={setParticleMeshRadius}/>
              </div>  
            </div>
          </div>
        </nav>

        {/* Hero Section with Three.js Background */}
        <FadeInSection>
        <section id="home" className="min-h-screen flex items-center justify-center relative ">
          {/* <Background /> */}
          <div className="text-center z-10 rounded-full ">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Michael Karb</h1>
            <div className="flex justify-center mb-6"></div>
      
            {/* <div className='justify-center items-center bg-gray-700/30 rounded-full px-6 py-8'> */}
            <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-2 ">I made this website so AI doesn't take my job.</p>
            <p className="text-lg md:text-xl max-w-xl mx-auto mb-2">(AI made this website)</p>
            <p className="text-xs md:text-xs max-w-sm mx-auto mb-0">(Just kidding)</p>
            {/* </div> */}
            <button 
              onClick={() => scrollToSection('about')}
              className="px-6 py-3 mt-6 bg-blue-700/80 hover:bg-blue-600/90 rounded-md transition">
              Learn More
            </button>
          </div>
        </section>
        </FadeInSection>

        {/* About Section */}
        <FadeInSection>
        <section id="about" className="py-20 px-4 relative">
        
          <div className="py-10 px-10 max-w-5xl mx-auto bg-gray-700/90 rounded-3xl">
            <h2 className="text-3xl font-bold mb-8 text-center">About me</h2>
            <div className="flex flex-col md:flex-row gap-8 ">
              <div className="w-64 h-64 rounded-full flex-shrink-0">
                {/* Profile image placeholder */}
                {/* <img src="italy.jpg" className="my-6 w-64 h-64 rounded-full object-cover border-8 border-gray-800 object-bottom"/> */}
                {/* <img src="japan.jpg" className="my-6 w-64 h-64 rounded-full object-cover border-8 border-gray-800"/> */}
                {/* <img src="skydive.jpg" className="my-6 w-64 h-64 rounded-full object-cover border-8 border-gray-800"/> */}
                <picture class="md:block my-6 w-64 h-64 rounded-full overflow-hidden block border-8 object-bottom border-gray-800">
                  <img src="italy.jpg" className="w-full h-full object-bottom object-cover rounded-full object-bottom hover:scale-125 ease-in duration-150"/>
                </picture>
                <picture class="hidden md:block my-6 w-64 h-64 rounded-full overflow-hidden block border-8 border-gray-800">
                  <img src="japan.jpg" className="w-full h-full rounded-full object-cover hover:scale-125 ease-in duration-150"/>
                </picture>
                <picture class="hidden md:block my-6 w-64 h-64 rounded-full overflow-hidden block border-8 border-gray-800">
                  <img src="ecuador.jpg" className="w-full h-full rounded-full object-cover hover:scale-125 ease-in duration-150"/>
                </picture>
                {/* <img src="ecuador.jpg" className="my-6 w-64 h-64 rounded-full object-cover border-8 border-gray-800"/> */}
                
                {/* <div className="w-64 h-64 rounded-full border-2 border-gray-500 object-bottom">
                  <img src="italy.jpg" className="z-1 w-64 h-64 rounded-full object-cover"/>
                </div> */}
                {/* <div className="w-full h-full rounded-full flex items-center justify-center text-center">
                  <img src="headshot.jpeg" className="my-3 rounded-full object-cover border-8 border-gray-900"/>
                </div> */}
              </div>
              <div>
                <p className="text-lg mb-4">
                  I'm a software engineer at IBM with a strong focus on building scalable, 
                  enterprise-grade systems using event-driven architecture, cloud microservices, and intelligent automation. 
                  
                  <br/>
                  <br/>

                  Over the past few years, I've led the design and implementation of high-performance services that support critical business functions, 
                  processing billions of dollars in transactional data, and empowering dozens of engineering teams across the enterprise.
                  
                  My expertise lies in designing and implementing low-latency, high-volume backend applications with Java and Python, 
                  while leveraging industry standard tools like Apache Kafka for event-driven processing, Docker and Kubernetes for cloud deployments, and Jenkins for CI/CD pipelines.  
                  My contributions have led to significant performance gains, widespread internal adoption, and pending patents.
                  I'm passionate about solving important technical challenges — whether it's optimizing distributed systems, automating manual tasks,
                  or architecting simple solutions for complex problems.
                  
                  <br/>
                  <br/>
                  
                  Beyond work, I graduated with a Master's in Computer Science from University of Illinois Urbana-Champaign and enjoy volunteering on meaningful side projects, 
                  such as building a mobile app for mental health education in Native American communities, or developing multilingual chat assistants to translate online conversations. 
                  I often leverage programming as a creative outlet, exploring interactive 3D projects using Three.js, developing indie games in Godot, or writing graphics engines with OpenGL.
                
                  <br/>
                  <br/>

                  Outside of software and engineering, I enjoy traveling, playing volleyball, drawing, watching TV, gaming, and learning about history. 
                  I also love watching football, and would pay an outrageous amount of money to watch the Bears play in the Superbowl.
                </p>
                <div className="flex gap-4 mt-6">
                  <a href="Resume.pdf" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-blue-500 text-blue-500 bg-gray-900/80 hover:bg-gray-700 hover:text-blue-500 rounded transition">
                    {/* Download Resume */}
                    Resume
                  </a>
                  <button 
                    onClick={() => scrollToSection('projects')}
                    className="px-4 py-2 bg-blue-700/80 hover:bg-blue-600/90 rounded transition"
                  >
                    See My Work
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </section>
        </FadeInSection>
        

        {/* Projects Section */}
        
        <FadeInSection>
        <section id="projects" className="py-20 px-4 bg-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center relative z-10">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        </section>
        </FadeInSection>


        <FadeInSection threshold={0.75}>
        {/* Skills Section */}
        <section id="skills" className="py-20 px-4 relative z-10 ">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Skills & Technologies</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <SkillBadge key={index} skill={skill} />
              ))}
            </div>
          </div>
        </section>
        </FadeInSection>

        <FadeInSection>
        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 bg-gray-800/50 ">
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-3xl font-bold mb-12 text-center">Get In Touch</h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold">Email:</p>
                    <p>mdk804@gmail.com</p>
                  </div>
                  <div>
                    <p className="font-semibold">Location:</p>
                    <p>Cary, NC, USA</p>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <a 
                      href="https://github.com/mdk8414" 
                      className="text-blue-400 hover:text-blue-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/michael-karb-a27631162/" 
                      className="text-blue-400 hover:text-blue-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold mb-4">Send Me a Message</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
        </FadeInSection>

        {/* Footer */}
        <footer className="py-8 px-4 bg-gray-900 border-t border-gray-800 ">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex gap-6 mt-4 md:mt-0">
              <a 
                href="https://github.com/mdk8414" 
                className="hover:text-blue-400 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/michael-karb-a27631162/" 
                className="hover:text-blue-400 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
        </div>
      </div>
      )
    }
    </div>
  );
}

// Project Card Component
function ProjectCard({ project }) {
  return (
    <div className="bg-gray-700/80 hover:bg-gray-600/80 rounded-lg overflow-hidden shadow-lg transition hover:shadow-xl hover:translate-y-1">
      <div className="h-64 bg-gray-600 relative bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }}>
        {/* Project image placeholder */}
        {/* <div className="w-full h-full flex items-center justify-center text-center p-4">
          <img
            src={project.image}
            alt={`${project.title} Screenshot`} 
            className="object-top object-cover w-full h-full"
          />
        </div> */}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span key={index} className="px-2 py-1 bg-gray-800 rounded-md text-sm">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          {project.demo && <a 
            href={project.demo} 
            className="text-blue-400 hover:text-blue-300 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Demo
          </a>}
          {project.repo && <a 
            href={project.repo} 
            className="text-blue-400 hover:text-blue-300 transition"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>}
        </div>
      </div>
    </div>
  );
}

// Skill Badge Component
function SkillBadge({ skill }) {
  return (
    <div className="bg-gray-700 rounded-lg p-4 text-center shadow transition hover:bg-gray-600 flex flex-col items-center justify-center">
      <div className="text-blue-400 text-lg mb-2">{skill.icon}</div>
      <div>{skill.name}</div>
    </div>
  );
}


// Sample Data
const projects = [
  {
    title: "AONest Mobile App (Volunteer)",
    description: "Mobile app that helps users track and understand their daily emotions, while improving their emotional intelligence with free educational resources.",
    technologies: ["React", "React Native", "Expo" ],
    image: "AONest/AONest-1.png",
    repo: "https://github.com/mdk8414/AO-mobile-app"
  },
  {
    title: "Raytracer",
    description: "Object-oriented full-feature 3D Ray Tracer with path tracing, bounding volume hierarchy, and various lighting and camera effects.",
    technologies: ["C", "C++"],
    image: "Raytracer/spiral.png",
    repo: "https://github.com/mdk8414/raytracer"
  },
  {
    title: "Scene Builder",
    description: "Graphics engine built with OpenGL that allows the player to create and modify objects, lighting, colors, textures, and more through an interactive interface.",
    technologies: ["C++", "OpenGL", "GLSL"],
    image: "SceneBuilder/scene-builder.png",
    demo: "SceneBuilder/scene-builder.mp4",
    repo: "https://github.com/mdk8414/scene-builder"
  },
  {
    title: "Image to Ascii",
    description: "Python utility that uses PILLOW to convert images into ASCII text art.",
    technologies: ["Python"],
    image: "Image2Ascii/fallout-ascii.png",
    repo: "https://github.com/mdk8414/image-to-ascii"
  },
  {
    title: "Dancing Lights",
    description: "Audio-reactive lights using an individually addressable LED strip. Built a custom breadboard circuit and programmed an Arduino to synchronize lighting effects with sound input.",
    technologies: ["Arduino", "C", "C++"],
    image: "DancingLights/audio-circuit.jpeg",
    repo: "https://github.com/mdk8414/audio-responsive-arduino"
  },
  {
    title: "This Website",
    description: "Personal portfolio website for yours truly, using Three JS for 3D graphics rendering.",
    technologies: ["React", "Tailwind CSS", "HTML", "Three JS", "Vite"],
    image: "Portfolio/portfolio-website.png",
    demo: ".",
    repo: "https://github.com/mdk8414/michael-karb-portfolio"
  }
];

const skills = [
  // Languages
  { name: "Java", icon: <FaJava size={28} /> },
  { name: "Python", icon: <FaPython size={28} color='ddddaa' /> },
  { name: "C / C++", icon: <SiCplusplus size={28} color='darkblue' /> },
  { name: "JavaScript", icon: <IoLogoJavascript color='yellow' size={28} /> },
  
  // Frameworks
  { name: "Spring Boot", icon: <SiSpringboot size={28} color='lightgreen' /> },
  { name: "React", icon: <FaReact size={28} color='00aaff' /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={28} color='teal' /> },
  { name: "REST", icon: <FaGear size={28} color='grey' /> },
  
  // Data Management
  { name: "PostgreSQL", icon: <SiPostgresql size={28} /> },
  { name: "MongoDB", icon: <SiMongodb size={28} color='green' /> },
  { name: "Amazon S3", icon: <SiAmazons3 size={28} color='darkorange' /> },
  { name: "Redis", icon: <DiRedis size={36} color='darkred' /> },

  { name: "Apache Kafka", icon: <SiApachekafka size={28} color='black' /> },  
  { name: "Kubernetes", icon: <SiKubernetes size={28} color="1188ff"/> },
  // { name: "SQL", icon: <FaDatabase size={28} /> },
  { name: "Docker", icon: <FaDocker size={28} /> },
  { name: "Git", icon: <FaGitAlt size={28} color='dd4400' /> },

  // { name: "Jenkins", icon: <FaJenkins size={28} color='darkblue' /> },  
  // { name: "Kubernetes", icon: <SiKubernetes size={28} color="1188ff"/> },
  // { name: "Docker", icon: <FaDocker size={28} /> },
  // { name: "Git", icon: <FaGitAlt size={28} color='dd4400' /> },
  
  // { name: "HTML5", icon: "📄" },
  // { name: "CSS3", icon: "🎨" },
];


export default App;

const TypewriterHeader = ({ texts, minSpeed=100, maxSpeed=25, lastTextSpeed=500, pauseTime=2000, repeat=true }) => {

  const [textIndex, setTextIndex] = useState(0);
  const [fullText, setFullText] = useState(texts[0]);
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [forward, setForward] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  
  useEffect(() => {
    if (isPaused) return;
   
    const timeout = setTimeout(() => {
      // console.log("index", index);  
      if (forward) {
        setDisplayText(prev => prev + fullText[index]);
        setIndex(index + 1);

        if (index === fullText.length - 1) {
          setIsPaused(true);
          setTimeout(() => setIsPaused(false), pauseTime);
          setForward(false);
        }
  
      } else {
        
        setDisplayText(prev => prev.slice(0, -1));
        setIndex(index - 1);

        if (index === 1) {
          setIsPaused(true);
          setTimeout(() => setIsPaused(false), pauseTime);
          setTextIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % texts.length;
            setFullText(texts[newIndex]);
            return newIndex;
          })
          if (repeat) setForward(true);
          else setIsStopped(true);
        }
      }
         
    }, ((textIndex === texts.length - 1) ? (forward ? lastTextSpeed : maxSpeed) : (forward ? minSpeed : maxSpeed)));

    
      
    return () => clearTimeout(timeout);
    
  }, [index, fullText, forward, isPaused]);
  
  return (
    <h2 className="text-2xl md:text-3xl text-center text-white-400 mb-6 font-mono">
      {!isStopped ? (
        <>
          {displayText.split('\n').map((line, index, array) => (
          <React.Fragment key={index}>
            {line}
            {index < array.length - 1 ? <br /> : null}
          </React.Fragment>
          ))}
          <span className="animate-blink">|</span>
        </>
      ) : null}
    </h2>
  );
};

const Slider = ({text, min, max, value, setValue}) => {

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const sliderRect = event.currentTarget.getBoundingClientRect();
      const percentage = Math.min(Math.max(0, (event.clientX - sliderRect.left) / sliderRect.width), 1);
      const newValue = Math.max(min, Math.round(percentage * max));
      setValue(newValue);
    }
  };

  const handleChange = (event) => {
    // event.stopPropagation();
    setValue(event.target.value);
  };

  useEffect(() => {
    // Add global mouse up event to handle releasing outside the slider
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };
    
    if (isDragging) {
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="slider-container">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="slider"
      />
      <p>{text}: {value}</p>
    </div>
  );
};


const ContactForm = () => {
  const form = useRef();
  const [disabled, setDisabled] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    setDisabled(true);

    emailjs.sendForm(
      'service_i69frd6', 
      'template_im6n2ce', 
      form.current, 
      { publicKey: 'z1TvHremRkAPh48tN' }
    ).then((result) => {
        console.log("Message sent successfully: ", result.text);
        setStatusMessage("✅ Message sent successfully! Thank you for reaching out.")
    }, (error) => {
        console.log("Message failed to send: ", error.text);
        setStatusMessage('❌ Failed to send message. Try again.');
        setDisabled(false);
    });

    // e.target.reset(); // clear form
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1">Name</label>
        <input 
          type="text" 
          id="name" 
          name='name'
          disabled={disabled}
          required
          autocomplete="one-time-code" // Using this to disable autocomplete since Chrome autofill messes with CSS styling
          className={`w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled && 'text-gray-400'}`}
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email"
          disabled={disabled}
          required
          autocomplete="one-time-code"
          className={`w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled && 'text-gray-400'}`}
        />
      </div>
      <div>
        <label htmlFor="message" className="block mb-1">Message</label>
        <textarea 
          id="message" 
          name="message"
          maxLength={1000}
          rows="4"
          disabled={disabled}
          required
          autocomplete="one-time-code"
          className={`w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled && 'text-gray-400'}`}
        />
      </div>
      <button 
        type="submit" 
        disabled={disabled}
        className={`px-6 py-3 rounded transition w-full ${disabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {disabled ? 'Message Sent' : 'Send Message'}
      </button>
      {statusMessage && <p>{statusMessage}</p>}
    </form>
  );
};

const FadeInSection = ({ children, threshold = 0.3 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [screenThreshold, setScreenThreshhold] = useState(threshold)
  
  useEffect(() => {
    const calculateThreshold = () => {
      setScreenThreshhold(threshold * window.innerWidth / window.innerHeight);
    }

    calculateThreshold();
    window.addEventListener("resize", calculateThreshold);

    return () => {
      window.removeEventListener("resize", calculateThreshold);
    }
  }, threshold)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once it's visible, we can stop observing
          // observer.unobserve(entry.target);
        } else {
          setIsVisible(false);
        }
      },
      { threshold }
    );
    
    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    // Cleanup observer on component unmount
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);
  
  // Apply transition classes conditionally based on visibility
  const fadeClasses = `transition-all duration-[1000ms] ease-in-out transform ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-6"
}`;
  
  return (
    <div ref={sectionRef} className={fadeClasses}>
      {children}
    </div>
  );
};