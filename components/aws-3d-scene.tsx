"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Html } from "@react-three/drei";
import * as THREE from "three";

/* ──────────────────────────────────────────────────────────────────────────
   The six SCS-C02 domains as orbiting nodes around a central "isolated
   AWS account" core. Colour-coded by category. Hover a node to focus it
   and reveal the domain's role.
   ────────────────────────────────────────────────────────────────────────── */

type Node = {
  id: string;
  label: string;
  blurb: string;
  /** orbit position in radians around the Y axis */
  angle: number;
  /** vertical offset for visual interest */
  yOffset: number;
  /** brand hex */
  color: string;
};

const NODES: Node[] = [
  { id: "iam",     label: "IAM",          blurb: "Identity & access — policies, roles, least privilege.",         angle: 0,             yOffset:  0.4,  color: "#a78bfa" },
  { id: "s3",      label: "S3 + KMS",     blurb: "Data protection — encryption, bucket policy, key grants.",       angle: Math.PI / 3,   yOffset: -0.6,  color: "#22d3ee" },
  { id: "vpc",     label: "VPC",          blurb: "Network isolation — endpoints, NACLs, security groups.",         angle: 2 * Math.PI / 3, yOffset: 0.5,  color: "#34d399" },
  { id: "guard",   label: "GuardDuty",    blurb: "Threat detection — anomalies across CloudTrail + DNS + VPC.",    angle: Math.PI,       yOffset: -0.3, color: "#fbbf24" },
  { id: "trail",   label: "CloudTrail",   blurb: "Audit log — every API call, with Athena queryable history.",     angle: 4 * Math.PI / 3, yOffset: 0.3, color: "#f87171" },
  { id: "scp",     label: "Org + SCP",    blurb: "Account-level guardrails — region locks, deny-by-default.",      angle: 5 * Math.PI / 3, yOffset: -0.5, color: "#f472b6" },
];

const ORBIT_RADIUS = 3.2;

/* Central core — the "isolated AWS account". Gentle pulse on the inner core,
 * a transparent shield mesh wrapping it, and a wireframe outer ring. */
function Core({ hoveredId }: { hoveredId: string | null }) {
  const ref = useRef<THREE.Mesh>(null);
  const shieldRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      const s = 1 + Math.sin(t * 1.5) * 0.04;
      ref.current.scale.set(s, s, s);
    }
    if (shieldRef.current) {
      shieldRef.current.rotation.y = t * 0.15;
      shieldRef.current.rotation.x = Math.sin(t * 0.4) * 0.2;
    }
  });

  const dim = hoveredId !== null;

  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={dim ? 0.4 : 0.7}
          roughness={0.25}
          metalness={0.6}
        />
      </mesh>
      <mesh ref={shieldRef}>
        <icosahedronGeometry args={[1.45, 1]} />
        <meshBasicMaterial color="#a5b4fc" wireframe transparent opacity={dim ? 0.1 : 0.25} />
      </mesh>
      <Html distanceFactor={10} position={[0, -1.85, 0]} center>
        <div className="pointer-events-none whitespace-nowrap rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
          Isolated AWS account
        </div>
      </Html>
    </group>
  );
}

/* One orbiting service node. Hovers respond visually; click does not navigate
 * — kept passive so the canvas stays usable for both pointer + keyboard. */
function ServiceNode({
  node,
  hovered,
  setHovered,
  spin,
}: {
  node: Node;
  hovered: boolean;
  setHovered: (id: string | null) => void;
  spin: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const a = node.angle + spin;
    groupRef.current.position.set(
      Math.cos(a) * ORBIT_RADIUS,
      node.yOffset,
      Math.sin(a) * ORBIT_RADIUS
    );
    // Always face the camera-aligned axis (billboard-ish) but keep parallax.
    groupRef.current.lookAt(0, node.yOffset, 0);
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(node.id);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(null);
            document.body.style.cursor = "";
          }}
        >
          <icosahedronGeometry args={[hovered ? 0.45 : 0.35, 0]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={hovered ? 1.5 : 0.6}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
        <Html distanceFactor={9} position={[0, 0.7, 0]} center>
          <div className="pointer-events-none select-none rounded-md border border-white/15 bg-black/55 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            {node.label}
          </div>
        </Html>
      </Float>
    </group>
  );
}

/* Glowing connector lines between core and each node. Geometry rebuilt every
 * frame so they follow the node positions. Kept thin — they're atmosphere,
 * not the centrepiece. */
function ConnectorLines({ spin }: { spin: number }) {
  const lineRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => new THREE.BufferGeometry(), []);

  useFrame(() => {
    const positions: number[] = [];
    for (const node of NODES) {
      const a = node.angle + spin;
      const x = Math.cos(a) * ORBIT_RADIUS;
      const z = Math.sin(a) * ORBIT_RADIUS;
      positions.push(0, 0, 0, x, node.yOffset, z);
    }
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#7c3aed" transparent opacity={0.25} />
    </lineSegments>
  );
}

/* Master scene group — owns the rotation clock for nodes + connectors so they
 * stay perfectly synced. Auto-rotation pauses on prefers-reduced-motion. */
function Scene({
  hovered,
  setHovered,
  reducedMotion,
}: {
  hovered: string | null;
  setHovered: (id: string | null) => void;
  reducedMotion: boolean;
}) {
  const spinRef = useRef(0);

  useFrame((_state, delta) => {
    if (!reducedMotion && hovered === null) spinRef.current += delta * 0.08;
  });

  // Force re-render of children that depend on spinRef by reading it through
  // a passthrough hook (React Three Fiber updates on each frame anyway).
  const SpinPasser = () => {
    const [, setTick] = useState(0);
    useFrame(() => setTick((t) => (t + 1) % 1_000_000));
    return (
      <>
        <ConnectorLines spin={spinRef.current} />
        {NODES.map((n) => (
          <ServiceNode
            key={n.id}
            node={n}
            hovered={hovered === n.id}
            setHovered={setHovered}
            spin={spinRef.current}
          />
        ))}
      </>
    );
  };

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#a78bfa" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#22d3ee" />
      <Stars radius={60} depth={50} count={2000} factor={4} saturation={0} fade speed={reducedMotion ? 0 : 1} />
      <Core hoveredId={hovered} />
      <SpinPasser />
    </>
  );
}

/* Loader card shown while the WebGL context spins up. */
function SceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
        Loading 3D scene…
      </div>
    </div>
  );
}

/* Public entry. The hovered-node blurb is reflected in a panel under the
 * canvas so the experience works without needing the user to read tiny labels. */
export function Aws3dScene() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const activeNode = hovered ? NODES.find((n) => n.id === hovered) : null;

  return (
    <div className="relative h-[560px] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#0a0f1f] via-[#0f1429] to-[#06080f] sm:h-[620px]">
      <Suspense fallback={<SceneFallback />}>
        <Canvas
          camera={{ position: [0, 1.5, 7], fov: 55 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false }}
          aria-label="Interactive 3D scene of AWS security domains around an isolated AWS account"
        >
          <color attach="background" args={["#06080f"]} />
          <fog attach="fog" args={["#06080f", 8, 22]} />
          <Scene hovered={hovered} setHovered={setHovered} reducedMotion={reducedMotion} />
          <OrbitControls
            enablePan={false}
            minDistance={4.5}
            maxDistance={11}
            autoRotate={!reducedMotion && hovered === null}
            autoRotateSpeed={0.4}
            enableDamping
            dampingFactor={0.08}
          />
        </Canvas>
      </Suspense>

      {/* HUD — small hint and active-node panel, layered over the canvas */}
      <div className="pointer-events-none absolute left-4 top-4 rounded-md border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm">
        Drag to rotate · scroll to zoom · hover a node
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 right-4 transition-opacity">
        <div
          className={`mx-auto max-w-md rounded-xl border bg-black/50 p-3 backdrop-blur-md transition-all ${
            activeNode ? "border-white/20 opacity-100" : "border-white/5 opacity-60"
          }`}
        >
          {activeNode ? (
            <>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: activeNode.color }}>
                {activeNode.label}
              </p>
              <p className="mt-1 text-sm leading-snug text-white/90">{activeNode.blurb}</p>
            </>
          ) : (
            <p className="text-xs text-white/70">
              Each orbit is one SCS-C02 domain. Hover to focus.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
