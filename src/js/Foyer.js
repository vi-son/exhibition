import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PositionalAudioHelper } from "three/examples/jsm/helpers/PositionalAudioHelper.js";
import TWEEN from "@tweenjs/tween.js";

import useStateCallback from "./utils/useStateCallback.js";
import { get } from "./api/api.js";

import "../sass/Foyer.sass";

export default ({ exhibitions }) => {
  const canvasWrapperRef = useRef();
  const canvasRef = useRef();
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [sentenceShow, setSentenceShow] = useStateCallback(false);
  const [sentences] = useState([
    "Wie sieht eigentlich Musik aus?",
    "Was für eine Farbe hat ein Bass?",
    "Wer hat an der Uhr gedreht?",
    "Dilon, you son of a bitch",
    "Wieviel kostet ein Geld?",
    "Wer hat die Mukke gemacht?",
    "Wie gehts dir?",
    "Wann gibt's Abendessen?"
  ]);

  useEffect(() => {
    // Size
    const size = canvasWrapperRef.current.getBoundingClientRect();
    // Scene
    const scene = new THREE.Scene();
    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: 1
    });
    renderer.setSize(size.width, size.height);
    // Camera
    var camera = new THREE.PerspectiveCamera(
      30,
      size.width / size.height,
      0.01,
      1000
    );
    var controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 0, 8);
    controls.autoRotate = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;

    // Center sphere
    var geometry = new THREE.SphereGeometry(0.3, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0x8a86bb });
    var sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Audio listener
    const sounds = [];
    const listener = new THREE.AudioListener();
    camera.add(listener);

    // Camera Tween
    const introDuration = 3000;
    var from = camera.position.clone();
    var to = new THREE.Vector3(0, 0, 20);
    const cameraTween = new TWEEN.Tween(from)
      .to(to, introDuration)
      .delay(5000)
      .easing(TWEEN.Easing.Cubic.InOut)
      .start()
      .onUpdate(o => {
        camera.position.copy(from);
      });

    // Sentence audio spheres
    const sentences = [
      "sentence01.mp3",
      "sentence01.mp3",
      "sentence01.mp3",
      "sentence01.mp3",
      "sentence01.mp3",
      "sentence01.mp3",
      "sentence01.mp3",
      "sentence01.mp3"
    ];
    const positions = [];
    const cameraPositions = [];
    sentences.forEach(s => {
      const filePath = `/audio/sentences/${s}`;
      const sound = new THREE.PositionalAudio(listener);
      var helper = new PositionalAudioHelper(sound);
      // sound.add(helper);
      const spread = 5.0;
      const radius = 3.0;
      const lat = Math.random() * Math.PI * 2.0;
      const lng = Math.PI + Math.random() * -Math.PI;
      const position = new THREE.Vector3(
        radius * Math.cos(lat) * Math.sin(lng),
        radius * Math.sin(lat) * Math.sin(lng),
        radius * Math.cos(lng)
      );
      const cameraPosition = new THREE.Vector3(
        radius * 2 * Math.cos(lat) * Math.sin(lng),
        radius * 2 * Math.sin(lat) * Math.sin(lng),
        radius * 2 * Math.cos(lng)
      );
      positions.push(position);
      cameraPositions.push(cameraPosition);
      var sphereGeometry = new THREE.SphereBufferGeometry(0.05, 32, 32);
      var sphere = new THREE.Mesh(
        sphereGeometry,
        new THREE.MeshBasicMaterial(0xffffff)
      );
      var helperGeometry = new THREE.SphereBufferGeometry(1.0, 32, 32);
      var helperMaterial = new THREE.LineBasicMaterial({
        color: 0xff0000,
        linewidth: 1
      });
      var group = new THREE.Group();
      group.add(sound);
      group.add(sphere);
      group.position.copy(position);
      scene.add(group);
      // // load a sound and set it as the Audio object's buffer
      const audioLoader = new THREE.AudioLoader();
      audioLoader.load(filePath, function(buffer) {
        sound.setBuffer(buffer);
        // sound.setLoop(true);
        sound.setVolume(1.0);
        sound.setDistanceModel("exponential");
        sound.setRolloffFactor(5.0);
        // sound.setMaxDistance(0.01);
        // sound.setRefDistance(1);
        // sound.play();
      });
      sounds.push(sound);
    });

    let i = 0;

    const timedOut = setTimeout(() => {
      const duration = 5000;
      const delay = 1000;
      setInterval(() => {
        var from = camera.position.clone();
        var to = cameraPositions[i];
        const cameraTween = new TWEEN.Tween(from)
          .to(to, duration)
          .easing(TWEEN.Easing.Cubic.InOut)
          .delay(delay)
          .start()
          .onStart(() => {
            setSentenceShow(false);
          })
          .onUpdate(o => {
            camera.position.copy(from);
          })
          .onComplete(() => {
            i = (i + 1) % positions.length;
            setSentenceIndex(i);
            setTimeout(() => {
              setSentenceShow(true);
            }, 600);
          });
        var fromLookAt = controls.target.clone();
        var toLookAt = positions[i];
        const lookAtTween = new TWEEN.Tween(fromLookAt)
          .to(toLookAt, duration)
          .easing(TWEEN.Easing.Cubic.InOut)
          .delay(delay)
          .start()
          .onUpdate(() => {
            controls.target = fromLookAt;
            controls.update();
          });
      }, duration + 2 * delay);
      clearTimeout(timedOut);
    }, introDuration);

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
      vertexShader: require("../glsl/background.vert.glsl"),
      fragmentShader: require("../glsl/background.frag.glsl"),
      uniforms: {
        uResolution: { value: new THREE.Vector2(size.width, size.height) }
      },
      depthWrite: false
    });
    var planeGeometry = new THREE.PlaneGeometry(2, 2);
    var backgroundPlane = new THREE.Mesh(planeGeometry, backgroundMaterial);
    backgroundScene.add(backgroundPlane);
    renderer.autoClear = false;

    // Render loop
    var render = function() {
      requestAnimationFrame(render);
      controls.update();
      TWEEN.update();
      renderer.clear();
      renderer.render(backgroundPlane, backgroundCamera);
      renderer.render(scene, camera);
    };
    render();
  }, []);

  const scrollToIntro = () => {
    const size = canvasWrapperRef.current.getBoundingClientRect();
    window.scrollBy({ left: 0, top: size.height, behavior: "smooth" });
  };

  return (
    <div className="foyer">
      <div className="foyer-canvas-wrapper" ref={canvasWrapperRef}>
        <canvas ref={canvasRef} />
        {sentenceShow}
        <h2 className={["sentence", sentenceShow ? "show" : "hide"].join(" ")}>
          {sentences[sentenceIndex]}
          {/* {sentenceShow ? "show" : "hide"} */}
        </h2>

        <div className="button-wrapper">
          <button onClick={scrollToIntro} className="scroll-down-button">
            Zu den Ausstellungsräumen
          </button>
        </div>
      </div>
      <div className="content">
        <h1>Foyer</h1>
        <h2>Exhibition Rooms:</h2>
        {exhibitions.map(entry => {
          return (
            <Link to={`/${entry.id}`} key={entry.id}>
              <div className="exhibition-entry">
                <h4>{entry.text}</h4>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
