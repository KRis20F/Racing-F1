import { extend } from '@react-three/fiber';
import * as THREE from 'three';

// Extend Three.js with custom objects
extend(THREE);

// Configure WebGL parameters
const glConfig = {
  alpha: true,
  antialias: true,
  powerPreference: 'high-performance',
  failIfMajorPerformanceCaveat: true,
  preserveDrawingBuffer: true
};

// Configure default props for Canvas
const defaultCanvasProps = {
  gl: glConfig,
  dpr: [1, 2],
  flat: true,
  legacy: false
};

export { defaultCanvasProps, glConfig }; 