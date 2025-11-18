"use client";
import { useEffect, useMemo, useRef } from "react";
import { Color, Scene, Fog, Vector3, Group } from "three";
import ThreeGlobe from "three-globe";
import { useFrame, useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { GlobeConfig } from "@/types/globe";
import countries from "@/data/globe.json";
declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElements["mesh"] & {
      new (): ThreeGlobe;
    };
  }
}

extend({ ThreeGlobe: ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const cameraZ = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

type ArcPoint = {
  size: number;
  order: number;
  color: string;
  lat: number;
  lng: number;
};

type PositionObjAccessor<T> = (obj: object) => T;
type PointObjAccessor<T> = (obj: object) => T;

const toArcAccessor = <T,>(accessor: (arc: Position) => T): PositionObjAccessor<T> => {
  return (arc) => accessor(arc as Position);
};

const toPointAccessor = <T,>(accessor: (point: ArcPoint) => T): PointObjAccessor<T> => {
  return (point) => accessor(point as ArcPoint);
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

export function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<Group | null>(null);

  const defaultProps = useMemo(
    () => ({
      pointSize: 1,
      atmosphereColor: "#ffffff",
      showAtmosphere: true,
      atmosphereAltitude: 0.1,
      polygonColor: "rgba(255,255,255,0.7)",
      globeColor: "#1d072e",
      emissive: "#000000",
      emissiveIntensity: 0.1,
      shininess: 0.9,
      arcTime: 2000,
      arcLength: 0.9,
      rings: 1,
      maxRings: 2,
      autoRotate: true,
      autoRotateSpeed: 1,
      ...globeConfig,
    }),
    [globeConfig],
  );

  // Initialize globe only once
  useEffect(() => {
    if (globeRef.current || !groupRef.current) {
      return;
    }

    const globeInstance = new ThreeGlobe();
    groupRef.current.add(globeInstance);
    globeRef.current = globeInstance;
  }, []);

  useFrame(() => {
    if (!groupRef.current || !defaultProps.autoRotate) {
      return;
    }
    groupRef.current.rotation.y += 0.002 * (defaultProps.autoRotateSpeed ?? 1);
  });

  // Build material when globe is initialized or when relevant props change
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) {
      return;
    }

    const globeMaterial = globe.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
      transparent: boolean;
      opacity: number;
    };
    globeMaterial.color = new Color(defaultProps.globeColor);
    globeMaterial.emissive = new Color(defaultProps.emissive);
    globeMaterial.emissiveIntensity = defaultProps.emissiveIntensity || 0.1;
    globeMaterial.shininess = defaultProps.shininess || 0.9;
    globeMaterial.transparent = true;
    globeMaterial.opacity = 0.25;
  }, [defaultProps]);

  // Build data when globe is initialized or when data changes
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || !data) {
      return;
    }

    const strokeOptions = [0.32, 0.28, 0.3];

    const points: ArcPoint[] = data.flatMap((arc) => [
      {
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
      },
      {
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
      },
    ]);

    const filteredPoints = points.filter(
      (point, index, array) =>
        array.findIndex(
          (candidate) => candidate.lat === point.lat && candidate.lng === point.lng,
        ) === index,
    );

    globe
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.polygonColor);

    globe
      .arcsData(data)
      .arcStartLat(toArcAccessor((arc) => arc.startLat))
      .arcStartLng(toArcAccessor((arc) => arc.startLng))
      .arcEndLat(toArcAccessor((arc) => arc.endLat))
      .arcEndLng(toArcAccessor((arc) => arc.endLng))
      .arcColor(toArcAccessor((arc) => arc.color))
      .arcAltitude(toArcAccessor((arc) => arc.arcAlt))
      .arcStroke(() => strokeOptions[Math.floor(Math.random() * strokeOptions.length)])
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap(toArcAccessor((arc) => arc.order))
      .arcDashGap(15)
      .arcDashAnimateTime(() => defaultProps.arcTime);

    globe
      .pointsData(filteredPoints)
      .pointColor(toPointAccessor((point) => point.color))
      .pointsMerge(true)
      .pointAltitude(0)
      .pointRadius(2);

    globe
      .ringsData([])
      .ringColor(() => defaultProps.polygonColor)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings,
      );
  }, [data, defaultProps]);

  // Handle rings animation with cleanup
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || !data.length) {
      return;
    }

    const interval = window.setInterval(() => {
      if (!globeRef.current) {
        return;
      }

      const randomRingIndexes = genRandomNumbers(
        0,
        data.length,
        Math.floor((data.length * 4) / 5),
      );

      const ringsData = data
        .filter((_, index) => randomRingIndexes.includes(index))
        .map((arc) => ({
          lat: arc.startLat,
          lng: arc.startLng,
          color: arc.color,
        }));

      globeRef.current.ringsData(ringsData);
    }, 2000);

    return () => {
      window.clearInterval(interval);
    };
  }, [data]);

  return <group ref={groupRef} />;
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);
  }, [gl, size.height, size.width]);

  return null;
}

export function World(props: WorldProps) {
  const { globeConfig } = props;
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);
  return (
    <Canvas
      scene={scene}
      camera={{ position: [0, 0, cameraZ], fov: 50, near: 0.1, far: 2000 }}
      style={{ width: "100%", height: "100%" }}
    >
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        enableDamping
        dampingFactor={0.05}
        autoRotate={false}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr: number[] = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (!arr.includes(r)) {
      arr.push(r);
    }
  }

  return arr;
}
