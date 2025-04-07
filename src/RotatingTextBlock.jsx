import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

const RotatingTextBlock = ({ titles = ['Software Developer', 'Web Designer', 'UI/UX Engineer', 'Full Stack Developer'] }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Setup scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Use square aspect ratio
        const renderer = new THREE.WebGLRenderer();

        const pointLight = new THREE.PointLight();
        pointLight.decay = 0;
        pointLight.position.set(0, 5, 5);
        pointLight.intensity = 2;

        scene.add(pointLight, new THREE.AmbientLight(0xffffff, 0.75));

        // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        // directionalLight.position.z = 3;
        // scene.add(directionalLight);
            

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.pointerEvents = 'none';
        mountRef.current.appendChild(renderer.domElement);

        // Create a rectangular prism
        const geometry = new THREE.BoxGeometry(4, 1, 1);
        const materials = titles.map((title) => {
            // Create canvas for each face
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 128;
            const ctx = canvas.getContext('2d');
            
            // Background
            ctx.fillStyle = '#071f82'; // dark blue
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.save();

            // Text
            ctx.fillStyle = 'white';
            // ctx.font = '48px Arial';
            ctx.font = 'bold 48px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(title, canvas.width/2, canvas.height/2, 0.9 * canvas.width);

            // Create texture from canvas
            const texture = new THREE.CanvasTexture(canvas);
            return new THREE.MeshStandardMaterial({ map: texture, roughness: 0.5, metalness: 0.5 });
        });

        const emptyMaterial = new THREE.MeshStandardMaterial();

        // Make a single material array with all 6 faces
        const boxMaterials = [
            emptyMaterial, // right
            emptyMaterial, // left
            materials[1], // top
            emptyMaterial, // bottom
            materials[0], // front
            emptyMaterial  // back
        ];

        const cube = new THREE.Mesh(geometry, boxMaterials);
        cube.position.y += 0.5;

        scene.add(cube);

        // Position camera
        camera.position.setZ(6);

        const box_tween_group = new TWEEN.Group();

        let boxMatIdx = 0;

        const createRotationTween = (startAngle, endAngle) => {
            return new TWEEN.Tween({ x: startAngle.x, y: startAngle.y, z: startAngle.z })
                .to({ x: endAngle.x, y: endAngle.y, z: endAngle.z }, 1000)
                .onUpdate((coords) => {
                    cube.rotation.set(coords.x, coords.y, coords.z);
                })
                .delay(1000)
                .repeat(Infinity)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .onRepeat(() => {
                    // Reset rotation
            
                    boxMatIdx++;
            
                    // console.log(boxMatIdx);
                    // console.log(materials.length);
                    // console.log("Clamped", boxMatIdx % materials.length);
            
                    cube.material[2] = materials[(boxMatIdx + 1) % materials.length]; 
                    cube.material[4] = materials[boxMatIdx % materials.length]; 

                    cube.rotation.set(0, 0, 0);
                    
                });
        };

        const tween1 = createRotationTween(new THREE.Vector3(0, 0, 0), new THREE.Vector3(Math.PI / 2, 0, 0));

        tween1.start();
        
        box_tween_group.add(tween1);

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            
            // Rotate the cube
            // cube.rotation.x += 0.005;
            box_tween_group.update();
            
            renderer.render(scene, camera);
        };

        animate();

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
            
            // Clean up resources
            geometry.dispose();
            materials.forEach(material => {
                material.map?.dispose();
                material.dispose();
            });
            renderer.dispose();
        };
    }, [titles]);

    return (
    <div 
        ref={mountRef} 
        className="inline-block align-middle mx-auto my-2"
        style={{ height: '100px', width: '300px' }}
    />
    );
};

export default RotatingTextBlock;