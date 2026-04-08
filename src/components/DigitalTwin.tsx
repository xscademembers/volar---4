import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DigitalTwin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00f2ff, 1);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // Industrial Assets Group
    const assets = new THREE.Group();
    scene.add(assets);

    // Create stylized industrial assets
    const createSilo = (x: number, z: number, height: number) => {
      const geometry = new THREE.CylinderGeometry(1, 1, height, 32);
      const material = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a1a, 
        roughness: 0.2,
        metalness: 0.8 
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, height / 2, z);
      assets.add(mesh);

      const ringGeo = new THREE.TorusGeometry(1.1, 0.02, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f2ff });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(x, height - 0.5, z);
      assets.add(ring);
    };

    const createChimney = (x: number, z: number, height: number) => {
      const geometry = new THREE.CylinderGeometry(0.5, 0.8, height, 32);
      const material = new THREE.MeshStandardMaterial({ color: 0x222222 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, height / 2, z);
      assets.add(mesh);
    };

    for (let i = 0; i < 8; i++) {
      createSilo(Math.random() * 30 - 15, Math.random() * 30 - 15, 4 + Math.random() * 6);
      createChimney(Math.random() * 30 - 15, Math.random() * 30 - 15, 10 + Math.random() * 8);
    }

    // Drones
    const drones = new THREE.Group();
    scene.add(drones);
    for (let i = 0; i < 15; i++) {
      const drone = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.1, 0.2),
        new THREE.MeshBasicMaterial({ color: 0x00f2ff })
      );
      drone.position.set(Math.random() * 40 - 20, 5 + Math.random() * 10, Math.random() * 40 - 20);
      (drone as any).velocity = new THREE.Vector3((Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.05);
      drones.add(drone);
    }

    const gridHelper = new THREE.GridHelper(100, 50, 0x00f2ff, 0x111111);
    scene.add(gridHelper);

    camera.position.set(20, 15, 20);
    camera.lookAt(0, 0, 0);

    sceneRef.current = { scene, camera, renderer };

    // GSAP Camera Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    tl.to(camera.position, { x: -25, y: 12, z: 10 })
      .to(camera.position, { x: 0, y: 20, z: 30 })
      .to(camera.position, { x: 15, y: 10, z: 15 });

    tl.to(camera.rotation, { y: Math.PI / 2 }, 0)
      .to(camera.rotation, { x: -Math.PI / 4 }, 1);

    const animate = () => {
      requestAnimationFrame(animate);
      drones.children.forEach((drone: any) => {
        drone.position.add(drone.velocity);
        if (Math.abs(drone.position.x) > 25) drone.velocity.x *= -1;
        if (Math.abs(drone.position.z) > 25) drone.velocity.z *= -1;
        if (drone.position.y < 2 || drone.position.y > 15) drone.velocity.y *= -1;
      });
      assets.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-50"
      style={{ filter: 'blur(0.5px)' }}
    />
  );
}
