"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  type Group,
  Line,
  ShaderMaterial,
  Vector2,
} from "three";

/* -------------------------------------------------------------------------- */
/*  Shared GLSL: the path of the "digital Nile" ribbon.                       */
/* -------------------------------------------------------------------------- */

const RIBBON_GLSL = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;

  // Centre line of the flow: a slow, meandering curve through space.
  vec3 flowPath(float x, float time) {
    float y = sin(x * 0.26 + time * 0.12) * 0.95 + sin(x * 0.11 - 0.6) * 0.8 - 0.2;
    float z = cos(x * 0.19 + time * 0.08) * 1.4 - 1.2;
    return vec3(x, y, z);
  }

  // Ribbon cross-section: offset across the width, twisting along its length.
  vec3 ribbonOffset(float x, float across, float depth, float time) {
    float twist = x * 0.22 + time * 0.09;
    float width = 1.05 + 0.45 * sin(x * 0.31 + 1.3);
    vec3 n = vec3(0.0, cos(twist), sin(twist));
    vec3 b = vec3(0.0, -sin(twist), cos(twist));
    return n * across * width + b * depth;
  }
`;

const LENGTH = 30.0;

/* -------------------------------------------------------------------------- */
/*  Flowing particle ribbon                                                   */
/* -------------------------------------------------------------------------- */

const particleVertex = /* glsl */ `
  ${RIBBON_GLSL}
  uniform float uPixelRatio;
  attribute float aT;
  attribute float aAcross;
  attribute float aDepth;
  attribute float aSpeed;
  attribute float aSize;
  varying float vAlpha;
  varying float vMix;

  void main() {
    float t = fract(aT + uTime * aSpeed);
    float x = (t - 0.5) * ${LENGTH.toFixed(1)};
    vec3 p = flowPath(x, uTime) + ribbonOffset(x, aAcross, aDepth, uTime);
    p.xy += uMouse * 0.25 * (1.0 - abs(aAcross) * 0.5);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (30.0 / -mv.z);

    float ends = smoothstep(0.0, 0.12, t) * smoothstep(1.0, 0.82, t);
    float edge = 1.0 - smoothstep(0.55, 1.0, abs(aAcross));
    vAlpha = ends * (0.35 + 0.65 * edge);
    vMix = clamp(t * 1.2 - 0.1 + aAcross * 0.15, 0.0, 1.0);
  }
`;

const particleFragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vAlpha;
  varying float vMix;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.0, d);
    float a = core * core * 1.4;
    vec3 col = mix(uColorA, uColorB, vMix);
    gl_FragColor = vec4(col, a * vAlpha);
  }
`;

function useUniforms() {
  return useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new Vector2() },
      uPixelRatio: { value: 1 },
      uColorA: { value: new Color("#4285FF") },
      uColorB: { value: new Color("#36D6C5") },
    }),
    [],
  );
}

type Uniforms = ReturnType<typeof useUniforms>;

function FlowParticles({ count, uniforms }: { count: number; uniforms: Uniforms }) {
  const geometry = useMemo(() => {
    const g = new BufferGeometry();
    const t = new Float32Array(count);
    const across = new Float32Array(count);
    const depth = new Float32Array(count);
    const speed = new Float32Array(count);
    const size = new Float32Array(count);
    const position = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      t[i] = Math.random();
      // Bias particles toward the centre of the ribbon.
      const r = Math.random() * 2 - 1;
      across[i] = Math.sign(r) * Math.pow(Math.abs(r), 1.6);
      depth[i] = (Math.random() - 0.5) * 0.35;
      speed[i] = 0.006 + Math.random() * 0.01;
      size[i] = Math.random() < 0.04 ? 3.2 + Math.random() * 2 : 0.8 + Math.random() * 1.4;
    }
    g.setAttribute("position", new BufferAttribute(position, 3));
    g.setAttribute("aT", new BufferAttribute(t, 1));
    g.setAttribute("aAcross", new BufferAttribute(across, 1));
    g.setAttribute("aDepth", new BufferAttribute(depth, 1));
    g.setAttribute("aSpeed", new BufferAttribute(speed, 1));
    g.setAttribute("aSize", new BufferAttribute(size, 1));
    return g;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/*  Data-stream strands: thin lines running along the ribbon                  */
/* -------------------------------------------------------------------------- */

const strandVertex = /* glsl */ `
  ${RIBBON_GLSL}
  uniform float uAcross;
  attribute float aT;
  varying float vT;

  void main() {
    float x = (aT - 0.5) * ${LENGTH.toFixed(1)};
    vec3 p = flowPath(x, uTime) + ribbonOffset(x, uAcross, 0.0, uTime);
    p.xy += uMouse * 0.25;
    vT = aT;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const strandFragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uPhase;
  varying float vT;

  void main() {
    float ends = smoothstep(0.0, 0.15, vT) * smoothstep(1.0, 0.8, vT);
    // A travelling pulse of light, like a packet moving through the network.
    float pulse = smoothstep(0.06, 0.0, abs(fract(vT - uTime * 0.05 + uPhase) - 0.5));
    vec3 col = mix(uColorA, uColorB, vT);
    gl_FragColor = vec4(col, ends * (uOpacity + pulse * 0.55));
  }
`;

function Strand({ across, phase, opacity, uniforms }: { across: number; phase: number; opacity: number; uniforms: Uniforms }) {
  // Built imperatively: <line> collides with the SVG element in JSX typings.
  const line = useMemo(() => {
    const segments = 240;
    const g = new BufferGeometry();
    const t = new Float32Array(segments);
    for (let i = 0; i < segments; i++) t[i] = i / (segments - 1);
    g.setAttribute("position", new BufferAttribute(new Float32Array(segments * 3), 3));
    g.setAttribute("aT", new BufferAttribute(t, 1));
    const material = new ShaderMaterial({
      // Shared uniform objects keep time and pointer in sync with the particles.
      uniforms: { ...uniforms, uAcross: { value: across }, uPhase: { value: phase }, uOpacity: { value: opacity } },
      vertexShader: strandVertex,
      fragmentShader: strandFragment,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    const l = new Line(g, material);
    l.frustumCulled = false;
    return l;
  }, [uniforms, across, phase, opacity]);

  useEffect(
    () => () => {
      line.geometry.dispose();
      (line.material as ShaderMaterial).dispose();
    },
    [line],
  );

  return <primitive object={line} />;
}

/* -------------------------------------------------------------------------- */
/*  Network: nodes and connections floating around the flow                   */
/* -------------------------------------------------------------------------- */

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function Network({ nodeCount }: { nodeCount: number }) {
  const { nodes, lines } = useMemo(() => {
    const rand = seeded(7);
    const pts: [number, number, number][] = [];
    for (let i = 0; i < nodeCount; i++) {
      pts.push([(rand() - 0.25) * 16, (rand() - 0.45) * 7, -1 - rand() * 5]);
    }
    const nodePositions = new Float32Array(pts.flat());
    const segs: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i]!;
        const b = pts[j]!;
        const d = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
        if (d < 2.6) segs.push(...a, ...b);
      }
    }
    const n = new BufferGeometry();
    n.setAttribute("position", new BufferAttribute(nodePositions, 3));
    const l = new BufferGeometry();
    l.setAttribute("position", new BufferAttribute(new Float32Array(segs), 3));
    return { nodes: n, lines: l };
  }, [nodeCount]);

  useEffect(
    () => () => {
      nodes.dispose();
      lines.dispose();
    },
    [nodes, lines],
  );

  return (
    <group>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color="#7aa9ff" transparent opacity={0.055} depthWrite={false} />
      </lineSegments>
      <points geometry={nodes}>
        <pointsMaterial color="#cfe0ff" size={0.06} sizeAttenuation transparent opacity={0.6} depthWrite={false} />
      </points>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scene                                                                     */
/* -------------------------------------------------------------------------- */

function Scene({ animate, quality }: { animate: boolean; quality: "high" | "low" }) {
  const group = useRef<Group>(null);
  const uniforms = useUniforms();
  const pointer = useRef(new Vector2());
  const { gl } = useThree();

  useEffect(() => {
    uniforms.uPixelRatio.value = gl.getPixelRatio();
  }, [gl, uniforms]);

  // Track the pointer over the whole window so the scene reacts even though
  // the hero text sits on top of the canvas.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (!animate) return;
    const dt = Math.min(delta, 0.05);
    uniforms.uTime.value += dt;
    const m = uniforms.uMouse.value;
    m.lerp(pointer.current, 0.035);
    if (group.current) {
      group.current.rotation.y += (pointer.current.x * 0.1 - group.current.rotation.y) * 0.03;
      group.current.rotation.x += (-pointer.current.y * 0.05 - group.current.rotation.x) * 0.03;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
    }
  });

  return (
    <group ref={group} rotation={[0.08, -0.32, -0.12]} position={[1.6, 0, 0]}>
      <FlowParticles count={quality === "high" ? 5600 : 2600} uniforms={uniforms} />
      {[-0.95, -0.45, 0, 0.5, 0.92].map((a, i) => (
        <Strand key={a} across={a} phase={i * 0.21} opacity={i === 2 ? 0.45 : 0.16} uniforms={uniforms} />
      ))}
      <Network nodeCount={quality === "high" ? 26 : 14} />
    </group>
  );
}

export interface NileSceneProps {
  animate?: boolean;
  /** Pause rendering entirely (e.g. when scrolled out of view). */
  paused?: boolean;
  quality?: "high" | "low";
  onReady?: () => void;
}

export default function NileScene({ animate = true, paused = false, quality = "high", onReady }: NileSceneProps) {
  return (
    <Canvas
      dpr={[1, quality === "high" ? 1.75 : 1.25]}
      camera={{ position: [0, 0, 9], fov: 42, near: 0.1, far: 60 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance", stencil: false, depth: false }}
      frameloop={paused || !animate ? "demand" : "always"}
      onCreated={() => onReady?.()}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <Scene animate={animate && !paused} quality={quality} />
    </Canvas>
  );
}
