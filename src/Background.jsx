import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';


function Background() {
    const mountRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);
  
    useEffect(() => {
      if (!mountRef.current) return;
  
      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      mountRef.current.appendChild(renderer.domElement);
  
      // Create particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 10000;
      
      const posArray = new Float32Array(particlesCount * 3);
      const originalPosArray = new Float32Array(particlesCount * 3);
      
      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
        originalPosArray[i] = posArray[i]; // Store original positions
      }
      
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x3b82f6, // Blue color
      });
      
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
  
      // Position camera
      camera.position.z = 3;
      
      // Scroll handler
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
      
      window.addEventListener('scroll', handleScroll);

      const pointer = new THREE.Vector2();
      const raycaster = new THREE.Raycaster();
      const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const mouseWorldPos = new THREE.Vector3();
      const mouseLocalPos = new THREE.Vector3();
  
      const onMouseMove = (event) => {
        // event.preventDefault();
        // Calculate normalized device coordinates
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(pointer, camera);

        raycaster.ray.intersectPlane(mousePlane, mouseWorldPos);

        mouseLocalPos.copy(mouseWorldPos);
        particlesMesh.worldToLocal(mouseLocalPos);

        const positions = particlesMesh.geometry.attributes.position.array;

        for (let i = 0; i < positions.length; i += 3) {

          const particlePosition = new THREE.Vector3(
            positions[i],
            positions[i + 1],
            positions[i + 2]
          );

          // const particleScreenPos = particlePosition;

          const dx = particlePosition.x  - mouseLocalPos.x;
          const dy = particlePosition.y - mouseLocalPos.y;
          const dz = particlePosition.z - mouseLocalPos.z;
          const distanceToMouse = Math.sqrt(dx * dx + dy * dy + dz * dz);

          

          // Apply force if within influence radius (adjust this value)
          const influenceRadius = 2;
          if (distanceToMouse < influenceRadius) {
            if (i % 100 === 0) {
              console.log("PP", particlePosition);
              console.log("MWP", mouseWorldPos);
            }


            // Direction vector from mouse to particle
            const direction = new THREE.Vector2(dx / distanceToMouse || 0, dy / distanceToMouse || 0);

            // Force strength (inverse to distance)
            const force = 0.05 * (1 - distanceToMouse / influenceRadius);


            // Apply force
            positions[i] += direction.x * force;
            positions[i + 1] += direction.y * force;
            // positions[i + 2] += direction.z * force;
          }
        }
                
        particlesMesh.geometry.attributes.position.needsUpdate = true;
      
      };
  
      window.addEventListener('mousemove', onMouseMove);
      
      // Animation
      const animate = () => {
        requestAnimationFrame(animate);
        
        // Base rotations
        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.001;
        
        // Scroll-based transformations
        const scrollFactor = window.scrollY * 0.0005;
        
        // Modify particle positions based on scroll
        const positions = particlesMesh.geometry.attributes.position.array;
        
        for (let i = 0; i < positions.length; i += 3) {
          // Create wave effect based on scroll position
          const targetX = originalPosArray[i] + Math.sin(scrollFactor + i * 0.1) * 0.1;
          const targetY = originalPosArray[i+1] + Math.cos(scrollFactor + i * 0.1) * 0.1;
          const targetZ = originalPosArray[i+2] + Math.sin(scrollFactor + i * 0.05) * 0.2;
          
          // Gradually move towards target position (allows mouse interactions to blend naturally)
          positions[i] += (targetX - positions[i]) * 0.1;
          positions[i+1] += (targetY - positions[i+1]) * 0.1;
          positions[i+2] += (targetZ - positions[i+2]) * 0.1;

        }
                
        particlesMesh.geometry.attributes.position.needsUpdate = true;
        
        // Camera movement based on scroll
        camera.position.y = -scrollFactor * 0.5;
        
        // Additional rotation based on scroll
        particlesMesh.rotation.y = scrollFactor * 0.5;
        
        renderer.render(scene, camera);
      };
      
      animate();
  
      // Handle window resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => {
        if (mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
      <div 
        ref={mountRef} 
        className="fixed inset-0"
        style={{ zIndex: 0 }}
      />
    );
  }
  
export default Background;


// Three.js Background Component
// function ThreeJsBackground() {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     if (!mountRef.current) return;

//     // Scene setup
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     mountRef.current.appendChild(renderer.domElement);

//     // Create particles
//     const particlesGeometry = new THREE.BufferGeometry();
//     const particlesCount = 1500;
    
//     const posArray = new Float32Array(particlesCount * 3);
//     for (let i = 0; i < particlesCount * 3; i++) {
//       posArray[i] = (Math.random() - 0.5) * 10;
//     }
    
//     particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.02,
//       color: 0x3b82f6, // Blue color
//     });
    
//     const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
//     scene.add(particlesMesh);

//     // Position camera
//     camera.position.z = 3;
    
//     // Animation
//     const animate = () => {
//       requestAnimationFrame(animate);
      
//       particlesMesh.rotation.x += 0.0005;
//       particlesMesh.rotation.y += 0.0005;
      
//       renderer.render(scene, camera);
//     };
    
//     animate();

//     // Handle window resize
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
    
//     window.addEventListener('resize', handleResize);
    
//     // Cleanup
//     return () => {
//       if (mountRef.current) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return <div ref={mountRef} className="absolute inset-0" />;
// }