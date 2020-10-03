import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PositionalAudioHelper } from "three/examples/jsm/helpers/PositionalAudioHelper.js";

import { get } from "./api/api.js";

import "../sass/Foyer.sass";

export default ({ exhibitions }) => {
  const canvasWrapperRef = useRef();
  const canvasRef = useRef();

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
    controls.autoRotate = true;
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
        <button onClick={scrollToIntro} className="scroll-down-button">
          Zu den Ausstellungsräumen
        </button>
      </div>
      <div className="content">
        <h1>Foyer</h1>
        <h2>Exhibition Rooms:</h2>
        {exhibitions.map(entry => {
          return (
            <Link to={`/${entry.id}`}>
              <div className="exhibition-entry" key={entry.id}>
                <h4>{entry.text}</h4>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
