import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';


function Background({ isExpanded, setIsExpanded}) {
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
    
    // let isExpanded = false;

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 1;   
      originalPosArray[i] = posArray[i]; // Store original positions
    }
    
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x3b82f6, // Blue color
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Position camera back
    camera.position.z = 3;
    
    // Scroll handler
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);

    const moveParticlesAwayFromCenter = (forceDir, influenceRadius) => {   
      // Retrieve positions of particles
      const positions = particlesMesh.geometry.attributes.position.array;

      // Iterate through each particle position
      for (let i = 0; i < positions.length; i += 3) {

        // Create a position vector for this particle position
        const particlePosition = new THREE.Vector3(
          positions[i],
          positions[i + 1],
          positions[i + 2]
        );

        // Calculate the distance from the mouse to this particle
        const dx = particlePosition.x;
        const dy = particlePosition.y;
        const dz = particlePosition.z;
        const distanceToCenter = Math.sqrt(dx * dx + dy * dy + dz * dz);

        // If the particle is within the influence radius of the mouse
        if (distanceToCenter < influenceRadius) {
          // Get (normalized) direction vector of particle to mouse
          const direction = new THREE.Vector2(dx / distanceToCenter || 0, dy / distanceToCenter || 0);

          // Calculate the force strength based on distance to mouse
          const force = 0.2 * (1 - distanceToCenter / influenceRadius);


          // Apply force to particle position
          positions[i] += forceDir * direction.x * force;
          positions[i + 1] += forceDir * direction.y * force;
          // positions[i + 2] += direction.z * force;
        }
      }
              
      particlesMesh.geometry.attributes.position.needsUpdate = true;
    }

    const pointer = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mouseWorldPos = new THREE.Vector3();
    const mouseLocalPos = new THREE.Vector3();
    let count = 0;

    let disableMouseParticleMovement = false;
    const moveParticlesWithMouse = (forceDir, influenceRadius) => {
      if (disableMouseParticleMovement) return;
      // Set the raycaster from the camera and mouse position
      raycaster.setFromCamera(pointer, camera);

      // Calculate the mouse position in 3D space by intersecting with the mouse plane
      raycaster.ray.intersectPlane(mousePlane, mouseWorldPos);

      // Conver the mouse world coordinates to local coordinates of the particle mesh
      mouseLocalPos.copy(mouseWorldPos);
      particlesMesh.worldToLocal(mouseLocalPos);

      // Retrieve positions of particles
      const positions = particlesMesh.geometry.attributes.position.array;

      // Iterate through each particle position
      for (let i = 0; i < positions.length; i += 3) {

        // Create a position vector for this particle position
        const particlePosition = new THREE.Vector3(
          positions[i],
          positions[i + 1],
          positions[i + 2]
        );

        // Calculate the distance from the mouse to this particle
        const dx = particlePosition.x  - mouseLocalPos.x;
        const dy = particlePosition.y - mouseLocalPos.y;
        const dz = particlePosition.z - mouseLocalPos.z;
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy + dz * dz);

        // Establish radius of influence
        // const influenceRadius = 2;

        // If the particle is within the influence radius of the mouse
        if (distanceToMouse < influenceRadius) {
          // Get (normalized) direction vector of particle to mouse
          const direction = new THREE.Vector2(dx / distanceToMouse || 0, dy / distanceToMouse || 0);

          // Calculate the force strength based on distance to mouse
          const force = 0.2 * (1 - distanceToMouse / influenceRadius);


          // Apply force to particle position
          positions[i] += forceDir * direction.x * force;
          positions[i + 1] += forceDir * direction.y * force;
          // positions[i + 2] += direction.z * force;
        }
      }
              
      particlesMesh.geometry.attributes.position.needsUpdate = true;
    }

    let implosionStartTime = null;

    const onMouseMove = (event, forceDir) => {
      
      event.preventDefault();
      
      // Calculate normalized mouse coordinates
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      if (!isExpanded) return;

      moveParticlesWithMouse(forceDir, 2);
    
    };

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    const presetColors = [
      new THREE.Color(0x3b82f6), // Blue
      new THREE.Color(0xf000f0), // Purple
      new THREE.Color(0xff0000), // Red
      new THREE.Color(0x00ccff), // Cyan
    ];

    let currentColorIndex = 0;
    let nextColorIndex = 1;
    let lerpFactor = 0; // Interpolation factor (0 to 1)

    let downDir = 1;
    let upDir = 0.5;
    window.addEventListener('mousemove', (event) => {
      if (isMouseDown) {
        onMouseMove(event, downDir);
      } else {
        onMouseMove(event, upDir);
      }
      
      const color = particlesMesh.material.color;

      // Lerp between current and next colors
      const currentColor = presetColors[currentColorIndex];
      const nextColor = presetColors[nextColorIndex];
      color.lerpColors(currentColor, nextColor, lerpFactor);

      // Increment lerp factor
      lerpFactor += 0.003; // Adjust speed of transition
      if (lerpFactor >= 1) {
        lerpFactor = 0;
        currentColorIndex = nextColorIndex;
        nextColorIndex = (nextColorIndex + 1) % presetColors.length; // Loop through colors
      }


    });

    let isMouseDown = false;
    let intervalId = null;
    const expandFactor = 10;

    window.addEventListener('mousedown', (event) => {
      isMouseDown = true;
      
      intervalId = setInterval(() => { 
          // Calculate normalized mouse coordinates
        // pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        // pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        moveParticlesWithMouse(0.5, 2);

      });
    });

    window.addEventListener('mouseup', (event) => {
      isMouseDown = false;

      if (!isExpanded && implosionStartTime === null) {
        implosionStartTime = Date.now();
        // return;
      }
      
      // if (!isExpanded) {
      //   // Big bang explosion
      //   for (let i = 0; i < particlesCount * 3; i++) {
      //     originalPosArray[i] = originalPosArray[i] * expandFactor;
      //   }
      //   isExpanded = true;
      //   upDir = -0.5;
      // }

      clearInterval(intervalId);
    })



    let gravity = -0.01;

    const animate = () => {
      requestAnimationFrame(animate);
      
      // Base rotations
      if (isExpanded) {
        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.z += 0.001;
      } else {
        particlesMesh.rotation.z += 0.001;
      }

      
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
        positions[i] += (targetX - positions[i]) * 0.01;
        positions[i+1] += (targetY - positions[i+1]) * 0.01;
        positions[i+2] += (targetZ - positions[i+2]) * 0.01;
        

      }
      
      if (!isExpanded) {
        if (!isMouseDown && implosionStartTime === null) {
          moveParticlesAwayFromCenter(0.5, 1.5);
          moveParticlesWithMouse(0.5, 1.5);
        } 

        if (implosionStartTime !== null) {
          disableMouseParticleMovement = true;
          const elapsedTime = Date.now() - implosionStartTime;
          // Implosion animation should last 4 seconds
          if (elapsedTime < 4000) {
            // Animate implosion
            moveParticlesAwayFromCenter(gravity, 3);
            gravity = Math.max(gravity - 0.005, -10);
          } 
          else {
            // Big bang explosion
            for (let i = 0; i < particlesCount * 3; i++) {
              originalPosArray[i] = originalPosArray[i] * expandFactor;
            }
            isExpanded = true;
            setIsExpanded(true);
            upDir = -0.5;
            implosionStartTime = null;
            disableMouseParticleMovement = false;
          }
        }
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
      window.removeEventListener('mousemove', onMouseMove);

      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-5"
      style={{ zIndex: 5 }}
    />
  );
}

export default React.memo(Background);
