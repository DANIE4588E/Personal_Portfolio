import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const MODEL_SOURCES = [
  { type: "glb", path: "/models/Painterly11.glb" },
];

const LOAD_TIMEOUT_MS = 12000;
const INTRO_DURATION_MS = 2400;
const FILL_LIGHT_DELAY = 0.35;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function getFileLabel(path) {
  const parts = path.split("/");
  return parts[parts.length - 1] || path;
}

function loadModelWithTimeout(source, onProgress, dracoLoader) {
  return new Promise((resolve, reject) => {
    let settled = false;

    const timeout = window.setTimeout(() => {
      if (!settled) {
        settled = true;
        reject(new Error(`Timeout loading ${source.path}`));
      }
    }, LOAD_TIMEOUT_MS);

    const done = (callback) => (value) => {
      if (settled) {
        return;
      }
      settled = true;
      window.clearTimeout(timeout);
      callback(value);
    };

    if (source.type === "glb") {
      const loader = new GLTFLoader();
      if (dracoLoader) {
        loader.setDRACOLoader(dracoLoader);
      }

      loader.load(
        source.path,
        done((gltf) => resolve(gltf.scene)),
        (event) => {
          if (!settled) {
            onProgress(event);
          }
        },
        done((error) => reject(error || new Error(`Failed loading ${source.path}`)))
      );
      return;
    }

    const loader = new FBXLoader();
    loader.load(
      source.path,
      done((model) => resolve(model)),
      (event) => {
        if (!settled) {
          onProgress(event);
        }
      },
      done((error) => reject(error || new Error(`Failed loading ${source.path}`)))
    );
  });
}

function disposeMaterial(material) {
  if (Array.isArray(material)) {
    material.forEach((item) => item.dispose());
    return;
  }
  if (material) {
    material.dispose();
  }
}

function enableVertexColorMaterial(mesh) {
  if (!mesh?.geometry || !mesh?.material) {
    return;
  }

  const colorAttr = mesh.geometry.getAttribute("color");
  if (!colorAttr) {
    return;
  }

  const apply = (mat) => {
    if (!mat) {
      return;
    }
    if ("vertexColors" in mat) {
      mat.vertexColors = true;
      mat.needsUpdate = true;
    }
  };

  if (Array.isArray(mesh.material)) {
    mesh.material.forEach(apply);
  } else {
    apply(mesh.material);
  }
}

export default function ModelViewer({ onIntroComplete }) {
  const containerRef = useRef(null);
  const introNotifiedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const host = containerRef.current;
    let mounted = true;
    let frameId = 0;

    const notifyIntroComplete = () => {
      if (introNotifiedRef.current) {
        return;
      }
      introNotifiedRef.current = true;
      if (typeof onIntroComplete === "function") {
        onIntroComplete();
      }
    };

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    } catch {
      window.setTimeout(notifyIntroComplete, 400);
      return undefined;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.28;
    renderer.setClearColor(0x000000, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x060b13, 8.5, 22);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.set(0, 1.15, 5.8);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = false;
    controls.enableRotate = false;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enabled = false;

    const introStartPos = new THREE.Vector3(0, -1.65, -4.8);
    const introEndPos = new THREE.Vector3(0, -0.2, 0);
    const introStartRot = new THREE.Euler(-0.72, -1.05, -0.24);
    const introEndRot = new THREE.Euler(-0.22, 0.34, 0.04);

    const ambientTargetIntensity = 0.16;
    const rimTargetIntensity = 0.26;
    const backTargetIntensity = 0.12;
    const ambientLight = new THREE.HemisphereLight(0x1b263a, 0x03060d, 0);
    const rimLight = new THREE.DirectionalLight(0x7b9ccc, 0);
    rimLight.position.set(-2.2, 1.9, -2.8);
    const backLight = new THREE.PointLight(0xcaf0f8, 0, 9, 2);
    backLight.position.set(2, -0.85, -1.3);

    const spotlight = new THREE.SpotLight(0xffffff, 0.25, 8.4, Math.PI * 0.082, 0.06, 1.0);
    spotlight.position.set(0, 6.6, 1.25);
    spotlight.target.position.set(introEndPos.x, introEndPos.y - 0.12, introEndPos.z + 0.3);

    scene.add(ambientLight, rimLight, backLight, spotlight, spotlight.target);

    const modelPivot = new THREE.Group();
    scene.add(modelPivot);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    dracoLoader.setDecoderConfig({ type: "wasm" });
    dracoLoader.preload();

    const resizeRenderer = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) {
        return;
      }
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(resizeRenderer);
    resizeObserver.observe(host);
    resizeRenderer();

    let modelLoaded = false;
    let introActive = false;
    let introStart = 0;
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let pointerX = 0;
    let pointerY = 0;

    const maxYaw = 0.12;
    const maxPitch = 0.08;

    const handlePointerMove = (event) => {
      const rect = host.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        return;
      }
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      pointerTargetX = THREE.MathUtils.clamp(nx, -1, 1);
      pointerTargetY = THREE.MathUtils.clamp(ny, -1, 1);
    };

    const resetPointer = () => {
      pointerTargetX = 0;
      pointerTargetY = 0;
    };

    host.addEventListener("pointermove", handlePointerMove);
    host.addEventListener("pointerleave", resetPointer);

    const animate = () => {
      if (!mounted) {
        return;
      }

      const now = performance.now();

      pointerX = THREE.MathUtils.lerp(pointerX, pointerTargetX, 0.06);
      pointerY = THREE.MathUtils.lerp(pointerY, pointerTargetY, 0.06);

      if (modelLoaded) {
        if (introActive) {
          const t = Math.min(1, (now - introStart) / INTRO_DURATION_MS);
          const eased = easeOutCubic(t);

          modelPivot.position.lerpVectors(introStartPos, introEndPos, eased);
          modelPivot.rotation.set(
            THREE.MathUtils.lerp(introStartRot.x, introEndRot.x, eased) - pointerY * maxPitch,
            THREE.MathUtils.lerp(introStartRot.y, introEndRot.y, eased) + (1 - eased) * 0.25 + pointerX * maxYaw,
            THREE.MathUtils.lerp(introStartRot.z, introEndRot.z, eased)
          );

          spotlight.intensity = THREE.MathUtils.lerp(0.25, 9.2, eased);
          const fillProgress = THREE.MathUtils.clamp((t - FILL_LIGHT_DELAY) / (1 - FILL_LIGHT_DELAY), 0, 1);
          const fillEased = easeOutCubic(fillProgress);
          ambientLight.intensity = THREE.MathUtils.lerp(0, ambientTargetIntensity, fillEased);
          rimLight.intensity = THREE.MathUtils.lerp(0, rimTargetIntensity, fillEased);
          backLight.intensity = THREE.MathUtils.lerp(0, backTargetIntensity, fillEased);

          if (t >= 1) {
            introActive = false;
            notifyIntroComplete();
          }
        } else {
          modelPivot.rotation.set(
            introEndRot.x - pointerY * maxPitch,
            introEndRot.y + pointerX * maxYaw,
            introEndRot.z
          );
          spotlight.intensity = 9.2;
          ambientLight.intensity = ambientTargetIntensity;
          rimLight.intensity = rimTargetIntensity;
          backLight.intensity = backTargetIntensity;
        }
      }

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    animate();

    (async () => {
      for (const source of MODEL_SOURCES) {
        if (!mounted) {
          return;
        }

        try {
          const model = await loadModelWithTimeout(
            source,
            (event) => {
              if (!event.total || !mounted) {
                return;
              }
            },
            dracoLoader
          );

          if (!mounted) {
            return;
          }

          model.traverse((node) => {
            if (node.isMesh) {
              node.castShadow = false;
              node.receiveShadow = false;
              enableVertexColorMaterial(node);

              if (node.material) {
                if (Array.isArray(node.material)) {
                  node.material.forEach((mat) => {
                    if (mat) {
                      mat.side = THREE.DoubleSide;
                    }
                  });
                } else {
                  node.material.side = THREE.DoubleSide;
                }
              }
            }
          });

          const fitBox = new THREE.Box3().setFromObject(model);
          const size = fitBox.getSize(new THREE.Vector3());
          const maxAxis = Math.max(size.x, size.y, size.z) || 1;
          const scale = 2.9 / maxAxis;
          model.scale.setScalar(scale);

          fitBox.setFromObject(model);
          const adjustedSize = fitBox.getSize(new THREE.Vector3());
          const axisEntries = [
            ["x", adjustedSize.x],
            ["y", adjustedSize.y],
            ["z", adjustedSize.z],
          ];

          axisEntries.sort((a, b) => a[1] - b[1]);
          const [thinAxis, thinValue] = axisEntries[0];
          const thickValue = axisEntries[2][1] || 1;

          if (thinValue / thickValue < 0.08) {
            const targetThickness = thickValue * 0.2;
            const boost = Math.min(20, Math.max(1, targetThickness / Math.max(thinValue, 0.0001)));
            model.scale[thinAxis] *= boost;
          }

          fitBox.setFromObject(model);
          const center = fitBox.getCenter(new THREE.Vector3());
          model.position.sub(center);

          modelPivot.add(model);
          modelPivot.position.copy(introStartPos);
          modelPivot.rotation.copy(introStartRot);

          modelLoaded = true;
          introActive = true;
          introStart = performance.now();

          return;
        } catch (error) {
          console.warn(`3D load attempt failed for ${source.path}`, error);
        }
      }

      if (mounted) {
        window.setTimeout(notifyIntroComplete, 700);
      }
    })();

    return () => {
      mounted = false;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", handlePointerMove);
      host.removeEventListener("pointerleave", resetPointer);

      controls.dispose();
      dracoLoader.dispose();

      scene.traverse((node) => {
        if (node.isMesh) {
          node.geometry?.dispose();
          disposeMaterial(node.material);
        }
      });

      renderer.dispose();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [onIntroComplete]);

  return (
    <div className="viewer-shell" aria-label="Interactive 3D model scene">
      <div ref={containerRef} className="model-viewer" />
    </div>
  );
}
