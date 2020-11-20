import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PositionalAudioHelper } from "three/examples/jsm/helpers/PositionalAudioHelper.js";
import TWEEN from "@tweenjs/tween.js";
// Local imports
import useStateCallback from "../utils/useStateCallback.js";
import { get } from "../api/api.js";
import FoyerFooter from "./Footer.js";
import Room from "./Room.js";
// SVG imports
import VisonMixingSenses from "../../../assets/svg/vi.son-mixing-senses.svg";
import IconMouse from "../../../assets/svg/mouse.svg";
// Style imports
import "../../sass/Foyer.sass";
// GLSL imports
import vertexShader from "../../glsl/background.vert.glsl";
import fragmentShader from "../../glsl/background.frag.glsl";

export default ({ exhibitions }) => {
  const canvasWrapperRef = useRef();
  const canvasRef = useRef();
  const [learned, setLearned] = useState(false);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [sentenceShow, setSentenceShow] = useStateCallback(false);
  const [sentences] = useState([
    "Findet Musik nur in meinem Kopf statt?",
    "Werden durch Musik unterschiedliche Bilder hervorgerufen?",
    "Wie nehmen andere Menschen Musik wahr?",
    "Kann man Musik mit Farben verbinden?",
    "Was kann Musik auslösen?",
    "Wie lässt sich Kunst von Musik inspirieren?",
    "Welche Farbe hat der Kammerton A?",
    "Welche Klänge lassen sich schwer visualisieren?",
    "Wie sieht der selbe Akkord auf unterschiedlichen Instrumenten aus?",
    "Wie entstehen Farben zu unterschiedlichen Klängen",
    "Hat jeder Ton eine zugeordnete Farbe?",
    "Sieht Musik für jeden anders aus?",
    "Kann man Musik nur mit dem Ohr höhren, oder gar fühlen oder sogar sehen?"
  ]);

  useEffect(() => {
    // Size
    let size = canvasWrapperRef.current.getBoundingClientRect();
    // Scene
    const scene = new THREE.Scene();
    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: 1
    });
    renderer.setSize(size.width, size.height);
    // Raycaster
    const LAYER_RAYCASTABLE = 1;
    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(LAYER_RAYCASTABLE);
    var hit = [];
    var mousePosition = new THREE.Vector2();
    // Camera
    var camera = new THREE.PerspectiveCamera(
      30,
      size.width / size.height,
      0.01,
      1000
    );
    var controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 0, 12);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.enableRotate = false;
    controls.dampingFactor = 0.9;

    // Center sphere
    var geometry = new THREE.SphereGeometry(0.3, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0xebf6f6 });
    var centerSphere = new THREE.Mesh(geometry, material);
    scene.add(centerSphere);

    // Audio listener
    const audioLoader = new THREE.AudioLoader();
    const sounds = new Map();
    let playingSound = undefined;
    const listener = new THREE.AudioListener();
    camera.add(listener);

    // Foyer music
    const filePathFoyerMusic =
      "/assets/mp3/foyer/foyer-backgorund-20201117.mp3";
    var foyerMusic = new THREE.Audio(listener);
    // load a sound and set it as the Audio object's buffer
    audioLoader.load(filePathFoyerMusic, function(buffer) {
      foyerMusic.setBuffer(buffer);
      foyerMusic.setLoop(true);
      foyerMusic.setVolume(0.5);
      foyerMusic.play();
    });

    // Sentence audio spheres
    const sentenceAudios = process.env.INTRO_SOUNDS;
    let visibleAudioSphere = null;
    const cameraPositions = [];
    const colorPalette = [
      0xdba8af,
      0xd780a2,
      0xffd4a2,
      0xa7e2d8,
      0x7a63a7,
      0x4d5082
    ];
    const audioSpheres = new THREE.Group();
    sentenceAudios.forEach(s => {
      const filePath = `/assets/mp3/intro/${s}`;
      console.log(filePath);
      const sound = new THREE.Audio(listener);
      const spread = 5.0;
      const radius = 3.0;
      const lat = Math.random() * Math.PI * 2.0;
      const lng = Math.PI + Math.random() * -Math.PI;
      const position = new THREE.Vector3(
        radius * Math.cos(lat) * Math.sin(lng),
        radius * Math.sin(lat) * Math.sin(lng),
        radius * Math.cos(lng)
      );
      var sphereGeometry = new THREE.SphereBufferGeometry(0.05, 32, 32);
      var sphere = new THREE.Mesh(
        sphereGeometry,
        new THREE.MeshBasicMaterial(0x141827)
      );
      const randomIdx = Math.floor(colorPalette.length * Math.random());
      sphere.color = colorPalette[randomIdx];
      sphere.triggered = false;
      sphere.position.copy(position);
      sphere.layers.enable(LAYER_RAYCASTABLE);
      audioSpheres.add(sphere);
      audioSpheres.layers.enable(LAYER_RAYCASTABLE);
      scene.add(audioSpheres);
      // Load a sound and set it as the Audio object's buffer
      audioLoader.load(filePath, function(buffer) {
        sound.setBuffer(buffer);
        sound.position.copy(position);
        sound.setVolume(1.0);
      });
      console.log(sphere.id);
      sounds.set(sphere.id, sound);
    });

    // Sound analyzer
    let audioAnalyser = new THREE.AudioAnalyser(foyerMusic, 32);

    let i = 0;
    let delay = 2000;

    // Background
    var backgroundCamera = new THREE.OrthographicCamera(
      -2 / size.width,
      +2 / size.width,
      +2 / size.width,
      -2 / size.width,
      -1,
      100
    );
    const backgroundScene = new THREE.Scene();
    const backgroundMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uResolution: { value: new THREE.Vector2(size.width, size.height) }
      },
      depthWrite: false
    });
    var planeGeometry = new THREE.PlaneGeometry(2, 2);
    var backgroundPlane = new THREE.Mesh(planeGeometry, backgroundMaterial);
    backgroundScene.add(backgroundPlane);
    renderer.autoClear = false;

    function onWindowResize() {
      if (canvasWrapperRef.current) {
        size = canvasWrapperRef.current.getBoundingClientRect();
        camera.aspect = size.width / size.height;
        camera.updateProjectionMatrix();
        backgroundMaterial.uniforms.uResolution.value = new THREE.Vector2(
          size.width,
          size.height
        );
        renderer.setSize(size.width, size.height);
      }
    }
    const resizeHandler = window.addEventListener(
      "resize",
      onWindowResize,
      false
    );

    // Event listener
    function onMouseMove(e) {
      mousePosition.x = ((e.clientX - size.x) / size.width) * 2 - 1;
      mousePosition.y = -((e.clientY - size.y) / size.height) * 2 + 1;
    }

    const pointerMoveHandler = window.addEventListener(
      "pointermove",
      onMouseMove,
      false
    );

    let mouseDown = false;
    function onMouseDown() {
      mouseDown = true;
    }

    const pointerDownHandler = window.addEventListener(
      "pointerdown",
      onMouseDown,
      false
    );

    function onMouseUp() {
      mouseDown = false;
    }

    const pointerUpHandler = window.addEventListener(
      "pointerup",
      onMouseUp,
      false
    );

    // Render loop
    var raycast = () => {
      raycaster.setFromCamera(mousePosition, camera);
      hit = raycaster.intersectObjects(scene.children, true);
      if (hit.length > 0) {
        hit[0].object.scale.set(2.0, 2.0, 2.0);
        hit[0].object.material.color.set(hit[0].object.color);
        if (mouseDown) {
          setLearned(true);
          hit[0].object.triggered = true;
          hit[0].object.material.color.set(hit[0].object.color);
          hit[0].object.scale.set(2.0, 2.0, 2.0);
          sounds.get(hit[0].object.id).play();
          playingSound = sounds.get(hit[0].object.id);
          addLine(hit[0].object.position, hit[0].object);
          if (audioAnalyser === undefined) {
          }
        }
      } else {
        audioSpheres.children.forEach(a => {
          if (!a.triggered) {
            a.scale.set(1.0, 1.0, 1.0);
            a.material.color.set(0x141827);
          }
        });
      }
    };

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

    function addLine(from, obj) {
      const points = [];
      points.push(new THREE.Vector3().sub(from).multiplyScalar(0.33));
      points.push(new THREE.Vector3());
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      obj.add(line);
    }

    const clock = new THREE.Clock();
    var render = function() {
      requestAnimationFrame(render);
      controls.update();
      TWEEN.update();

      raycast();

      let dt = clock.getElapsedTime();
      audioSpheres.rotation.y += 0.00018;
      audioSpheres.rotation.x += 0.00017;
      audioSpheres.rotation.z += 0.00019;

      renderer.clear();
      renderer.render(backgroundPlane, backgroundCamera);
      renderer.render(scene, camera);

      if (audioAnalyser !== undefined) {
        const freq = audioAnalyser.getAverageFrequency();
        const remapped = 0.25 + freq / 20.0;
        const remappedCenter = Math.min(0.3 + 1.0 / (freq / 30.0), 2.0);
        centerSphere.scale.set(remappedCenter, remappedCenter, remappedCenter);
      }
    };
    render();

    return () => {
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
      while (backgroundScene.children.length > 0) {
        backgroundScene.remove(backgroundScene.children[0]);
      }
      sounds.forEach(s => {
        s.pause();
      });
      foyerMusic.pause();
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const scrollToIntro = () => {
    const size = canvasWrapperRef.current.getBoundingClientRect();
    window.scrollBy({ left: 0, top: size.height, behavior: "smooth" });
  };

  return (
    <div className="foyer">
      <div className="foyer-canvas-wrapper" ref={canvasWrapperRef}>
        <canvas ref={canvasRef}></canvas>
        <div className="top-logo-wrapper">
          <VisonMixingSenses />
        </div>
        <div className={["instruction", learned ? "learned" : ""].join(" ")}>
          <IconMouse />
          <span>Klicke die dunklen Datenpunkte an</span>
        </div>
        {sentenceShow}
        <div className="sentence-wrapper">
          <h2
            className={["sentence", sentenceShow ? "show" : "hide"].join(" ")}
          >
            {sentences[sentenceIndex]}
          </h2>
        </div>
        <div className="button-wrapper">
          <button onClick={scrollToIntro} className="scroll-down-button">
            Zu den Ausstellungsräumen
          </button>
        </div>
      </div>
      <div className="content">
        <div className="header-text">
          <h3 className="heading">Ausstellungsräume</h3>
          <article>Text folgt...</article>
        </div>
        {exhibitions.map(exhibit => {
          return <Room key={exhibit.id} exhibit={exhibit} />;
        })}
      </div>
      <FoyerFooter />
    </div>
  );
};
