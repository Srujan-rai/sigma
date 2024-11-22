import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const AIBackground = () => {
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

    // Set background color to a very dark tone
    scene.background = new THREE.Color(0x0a0a0a); // Dark background

    camera.position.z = 10;

    // Create nodes
    const nodeCount = 100;
    const nodes = [];
    const lines = new THREE.Group();
    scene.add(lines);

    const nodeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const nodeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vPosition;
        void main() {
          float pulse = abs(sin(length(vPosition) * 2.0 - time * 2.0));
          gl_FragColor = vec4(vec3(0.6, 1.0, 1.0) * pulse, 1.0); // Dark blue tone for nodes
        }
      `,
    });

    // Updated line color to a darker grey
    const lineMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x888888) }, // Dark grey line color
      },
      vertexShader: `
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        void main() {
          float opacity = abs(sin(time * 2.0)) * 0.7 + 0.3;
          gl_FragColor = vec4(color, opacity);
        }
      `,
      transparent: true,
    });

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      );
      nodes.push(node);
      scene.add(node);
    }

    // Add connections
    const connectNodes = () => {
      lines.clear();
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          if (Math.random() > 0.98) { // Adjust density
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
              nodes[i].position,
              nodes[j].position,
            ]);
            const line = new THREE.Line(lineGeometry, lineMaterial);
            lines.add(line);
          }
        }
      }
    };
    connectNodes();

    // Add floating particles
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      particlePositions[i] = (Math.random() - 0.5) * 20;
    }
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    // Updated particle color to a darker cyan
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x006666, // Dark cyan for particles
      size: 0.1,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse movement effect
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the entire network for dynamic movement
      lines.rotation.y += 0.001;

      // Update shader uniforms for animations
      lineMaterial.uniforms.time.value += 0.01;
      nodeMaterial.uniforms.time.value += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Adjust for window resize
    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Update camera aspect ratio
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Update renderer size
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", onWindowResize);

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return <div ref={mountRef} style={{ position: "absolute", width: "100%", height: "100%" }} />;
};

export default AIBackground;
