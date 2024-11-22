import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const InteractiveBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Create particles
    const particleCount = 2000;
    const particles = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];

    for (let i = 0; i < particleCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 10, // x
        (Math.random() - 0.5) * 10, // y
        (Math.random() - 0.5) * 10 // z
      );

      const color = new THREE.Color();
      color.setHSL(Math.random(), 1.0, 0.5);
      colors.push(color.r, color.g, color.b);
    }

    particles.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    particles.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const particleMesh = new THREE.Points(particles, particleMaterial);
    scene.add(particleMesh);

    // Track mouse movement
    const mouse = new THREE.Vector2();
    window.addEventListener("mousemove", (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Apply parallax effect
      particleMesh.rotation.x = mouse.y * 0.2;
      particleMesh.rotation.y = mouse.x * 0.2;
    });

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particleMesh.rotation.z += 0.001; // Slight rotation
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", mouse);
    };
  }, []);

  return <div ref={mountRef} style={{ position: "absolute", width: "100%", height: "100%" }} />;
};

export default InteractiveBackground;
