import React, { useRef, useEffect, useState } from 'react';
import Background from './Background';
import RotatingTextBlock from './RotatingTextBlock';


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

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
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
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <div className="absolute left-0 pl-10" ref={timeRef}></div>
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
                  <button onClick={() => scrollToSection('projects')} className={`text-left ${activeSection === 'projects' ? 'text-blue-400' : ''}`}>Projects</button>
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
        <section id="home" className="min-h-screen flex items-center justify-center relative zoom-in">
          {/* <Background /> */}
          <div className="text-center z-10 px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Michael Karb</h1>
            {/* <h2 className="text-2xl md:text-3xl text-blue-400 mb-6 animate-fadeIn">Software Developer</h2> */}
            {/* <TypewriterHeader /> */}
            {/* Replace the static h2 with the rotating block */}
            <div className="flex justify-center mb-6">
              {/* <RotatingTextBlock 
                titles={[
                  'Software Developer', 
                  'Web Designer', 
                  'Problem Solver', 
                  'Code Enthusiast',
                  'Overwatch Grandmaster Support',
                  'Erotic Anime Watcher',
                  'Giant Penis',
                  'Enthusiasm',
                  'Fuck you Justin',
                ]} 
              /> */}
            </div>
      
            <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-2 ">Made this website so AI doesn't take my job.</p>
            <p className="text-lg md:text-xl max-w-xl mx-auto mb-2">(AI made this website)</p>
            <p className="text-xs md:text-xs max-w-sm mx-auto mb-8">(Just kidding)</p>
            <button 
              onClick={() => scrollToSection('about')}
              className="px-6 py-3 bg-blue-700/80 hover:bg-blue-600/90 rounded-md transition">
              Learn More
            </button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 relative zoom-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">About me</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-64 h-64 rounded-full bg-gray-700 flex-shrink-0">
                {/* Profile image placeholder */}
                <div className="w-full h-full rounded-full flex items-center justify-center text-center">
                  <img src="headshot.jpeg" className="rounded-full object-cover border-2 border-gray-500"/>
                </div>
              </div>
              <div>
                <p className="text-lg mb-4">
                  {/* Hello! I'm a passionate software developer with experience in web development, 
                  cloud architecture, and machine learning. I enjoy solving complex problems and building 
                  intuitive applications that make a difference. */}
                  idk man
                </p>
                <p className="text-lg mb-4">
                  {/* With over X years of experience in the industry, I've worked on various projects 
                  ranging from small business websites to enterprise-level applications. My goal is 
                  to create software that is not only functional but also user-friendly and maintainable. */}
                  unless you have a job for me
                </p>
                <div className="flex gap-4 mt-6">
                  <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-blue-500 text-blue-500 bg-gray-900/80 hover:bg-gray-700 hover:text-blue-500 rounded transition">
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

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 bg-gray-800/50 zoom-in">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center relative z-10">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4 relative z-10 zoom-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Skills & Technologies</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <SkillBadge key={index} skill={skill} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 bg-gray-800/50 zoom-in">
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
                    <a href="#" className="text-blue-400 hover:text-blue-300">
                      GitHub
                    </a>
                    <a href="#" className="text-blue-400 hover:text-blue-300">
                      LinkedIn
                    </a>
                    <a href="#" className="text-blue-400 hover:text-blue-300">
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold mb-4">Send Me a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows="4"
                      className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded transition w-full"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 bg-gray-900 border-t border-gray-800 zoom-in">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-blue-400 transition">GitHub</a>
              <a href="#" className="hover:text-blue-400 transition">LinkedIn</a>
              <a href="#" className="hover:text-blue-400 transition">Twitter</a>
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
    <div className="bg-gray-700 rounded-lg p-4 text-center shadow transition hover:bg-gray-600">
      <div className="text-blue-400 text-lg mb-2">{skill.icon}</div>
      <div>{skill.name}</div>
    </div>
  );
}


// Sample Data
const projects = [
  {
    title: "AONest Mobile App",
    description: "Emotional intelligence mobile app for AONest using React / Native (Volunteered 2024-2025)",
    technologies: ["React", "React Native", "Expo" ],
    image: "AONest/AONest-1.png",
    // demo: "#",
    repo: "https://github.com/mdk8414/AO-mobile-app"
  },
  {
    title: "Raytracer",
    description: "Object-oriented full-feature 3D Ray Tracer with path tracing, bounding volume hierarchy, and various lighting and camera effects (2023)",
    technologies: ["C", "C++"],
    image: "Raytracer/spiral.png",
    // demo: "#",
    repo: "https://github.com/mdk8414/raytracer"
  },
  {
    title: "Scene Builder",
    description: "Mobile application for tracking fitness activities and nutrition.",
    technologies: ["C++", "OpenGL", "GLSL"],
    image: "SceneBuilder/scene-builder.png",
    demo: "SceneBuilder/scene-builder.mp4",
    repo: "https://github.com/mdk8414/scene-builder"
  },
  {
    title: "Image to Ascii",
    description: "E-commerce platform with integrated payment processing and inventory management.",
    technologies: ["Python"],
    image: "Image2Ascii/fallout-ascii.png",
    // demo: "#",
    repo: "https://github.com/mdk8414/image-to-ascii"
  },
  {
    title: "Project Five",
    description: "Browser extension that enhances productivity and blocks distractions.",
    technologies: ["JavaScript", "Chrome API", "CSS", "LocalStorage"],
    // demo: "#",
    repo: "#"
  },
  {
    title: "Project Six",
    description: "Interactive data visualization dashboard for business analytics.",
    technologies: ["D3.js", "Vue.js", "Express", "GraphQL"],
    // demo: "#",
    repo: "#"
  }
];

const skills = [
  { name: "JavaScript", icon: "JS" },
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🟢" },
  { name: "Python", icon: "🐍" },
  { name: "TypeScript", icon: "TS" },
  { name: "MongoDB", icon: "🍃" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Docker", icon: "🐳" },
  { name: "AWS", icon: "☁️" },
  { name: "Git", icon: "🔄" },
  { name: "HTML5", icon: "📄" },
  { name: "CSS3", icon: "🎨" }
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