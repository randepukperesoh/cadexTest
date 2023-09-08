import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const MyCanvas = ({arrPeaks, height}) => {
  const canvasRef = useRef(null);
  console.log(arrPeaks)
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    const createTriangle = (point1, point2, point3) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array([
        point1.x, point1.y, point1.z,
        point2.x, point2.y, point2.z,
        point3.x, point3.y, point3.z
      ]);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setIndex([0, 1, 2]);

      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

      const triangle = new THREE.Mesh(geometry, material);
      scene.add(triangle);

      return triangle;
    };

    arrPeaks.forEach((peak, i, arr) => {
      createTriangle(peak, arr[i + 1] ? arr[i + 1] : arr[0], { x: 0, y: 0, z: height });
    });

    camera.position.z = 5;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = true;
    controls.enableZoom = true;
    controls.maxPolarAngle = Math.PI / 2;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, [arrPeaks]);
  
  useEffect(() => {
    const handleResize = () => {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <canvas ref={canvasRef} />;
};

export default MyCanvas;