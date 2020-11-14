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
// SVG imports
import VisonMixingSenses from "../../../assets/svg/vi.son-mixing-senses.svg";
// Style imports
import "../../sass/Foyer.sass";
// GLSL imports
import vertexShader from "../../glsl/background.vert.glsl";
import fragmentShader from "../../glsl/background.frag.glsl";

export default ({ exhibitions }) => {
  const canvasWrapperRef = useRef();
  const canvasRef = useRef();
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
    camera.position.set(0, 0, 12);
    controls.autoRotate = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.9;

    // Center sphere
    var geometry = new THREE.SphereGeometry(0.3, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0x8a86bb });
    var centerSphere = new THREE.Mesh(geometry, material);
    scene.add(centerSphere);

    // Audio listener
    const audioLoader = new THREE.AudioLoader();
    const sounds = [];
    const soundDurations = [];
    const listener = new THREE.AudioListener();
    camera.add(listener);

    // Foyer music
    const filePathFoyerMusic =
      "/assets/mp3/foyer/foyer-backgorund-20201025.mp3";
    var foyerMusic = new THREE.Audio(listener);
    // load a sound and set it as the Audio object's buffer
    audioLoader.load(filePathFoyerMusic, function(buffer) {
      foyerMusic.setBuffer(buffer);
      foyerMusic.setLoop(true);
      foyerMusic.setVolume(0.05);
      foyerMusic.play();
    });

    // Camera Tween
    // const introDuration = 1500;
    // var from = camera.position.clone();
    // var to = new THREE.Vector3(0, 0, 20);
    // const cameraTween = new TWEEN.Tween(from)
    //   .to(to, introDuration)
    //   .delay(2000)
    //   .easing(TWEEN.Easing.Cubic.InOut)
    //   .start()
    //   .onUpdate(o => {
    //     camera.position.copy(from);
    //   });
    // Sentence audio spheres
    const sentenceAudios = [
      "fragen-und-statements-01.mp3",
      "fragen-und-statements-02.mp3",
      "fragen-und-statements-03.mp3",
      "fragen-und-statements-04.mp3",
      "fragen-und-statements-05.mp3",
      "fragen-und-statements-06.mp3",
      "fragen-und-statements-07.mp3",
      "fragen-und-statements-08.mp3",
      "fragen-und-statements-09.mp3",
      "fragen-und-statements-10.mp3",
      "fragen-und-statements-11.mp3",
      "fragen-und-statements-12.mp3"
    ];
    let visibleAudioSphere = null;
    const audioSpheres = [];
    const positions = [];
    const cameraPositions = [];
    sentenceAudios.forEach(s => {
      const filePath = `/assets/mp3/intro/${s}`;
      const sound = new THREE.PositionalAudio(listener);
      var helper = new PositionalAudioHelper(sound);
      sound.add(helper);
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
      group.add(sphere);
      group.position.copy(position);
      scene.add(group);
      group.offset = Math.random() * Math.PI * 2.0;
      group.direction = Math.random() > 0.5 ? -1 : 1;
      group.speed = Math.random() * 50.0;
      group.lng = Math.random() * Math.PI;
      audioSpheres.push(group);
      // Load a sound and set it as the Audio object's buffer
      audioLoader.load(filePath, function(buffer) {
        soundDurations.push(buffer.duration);
        sound.setBuffer(buffer);
        sound.position.copy(position);
        sound.setVolume(1.0);
        sound.setDistanceModel("exponential");
        sound.setRolloffFactor(2.0);
        sound.setMaxDistance(0.05);
        sound.setRefDistance(1);
      });
      sounds.push(sound);
    });

    // Sound analyzer
    // var audioAnalyser = undefined;

    let i = 0;
    let delay = 2000;
    // const timedOut = setTimeout(() => {
    //   const duration = soundDurations[i] * 1000;
    //   const delay = soundDurations[i] * 1000;
    //   setInterval(() => {
    //     var from = camera.position.clone();
    //     var to = cameraPositions[i];
    //     const cameraTween = new TWEEN.Tween(from)
    //       .to(to, duration)
    //       .easing(TWEEN.Easing.Cubic.InOut)
    //       .delay(delay)
    //       .start()
    //       .onStart(() => {
    //         setSentenceShow(false);
    //       })
    //       .onUpdate(o => {
    //         camera.position.copy(from);
    //       })
    //       .onComplete(() => {
    //         sounds[i].play();
    //         audioAnalyser = new THREE.AudioAnalyser(sounds[i], 32);
    //         audioAnalyser.analyser.smoothingTimeConstant = 0.98;
    //         visibleAudioSphere = audioSpheres[i];
    //         setSentenceIndex(i);
    //         // update index for the next audio
    //         i = (i + 1) % positions.length;
    //         setTimeout(() => {
    //           setSentenceShow(true);
    //         }, 600);
    //       });
    //     var fromLookAt = controls.target.clone();
    //     var toLookAt = positions[i];
    //     const lookAtTween = new TWEEN.Tween(fromLookAt)
    //       .to(toLookAt, duration)
    //       .easing(TWEEN.Easing.Cubic.InOut)
    //       .delay(delay)
    //       .start()
    //       .onStart(() => {})
    //       .onUpdate(() => {
    //         controls.target = fromLookAt;
    //         controls.update();
    //       })
    //       .onComplete(() => {});
    //   }, duration + 2 * delay);
    //   clearTimeout(timedOut);
    // }, introDuration);

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
        const newSize = canvasWrapperRef.current.getBoundingClientRect();
        camera.aspect = newSize.width / newSize.height;
        camera.updateProjectionMatrix();
        backgroundMaterial.uniforms.uResolution.value = new THREE.Vector2(
          newSize.width,
          newSize.height
        );
        renderer.setSize(newSize.width, newSize.height);
      }
    }
    const resizeHandler = window.addEventListener(
      "resize",
      onWindowResize,
      false
    );

    // Render loop
    const clock = new THREE.Clock();
    let dt = clock.getElapsedTime();
    var render = function() {
      requestAnimationFrame(render);
      controls.update();
      TWEEN.update();
      renderer.clear();
      renderer.render(backgroundPlane, backgroundCamera);
      renderer.render(scene, camera);

      dt = clock.getElapsedTime();
      audioSpheres.forEach(s => {
        const position = new THREE.Vector3(
          s.direction *
            3.0 *
            Math.cos(dt / s.speed + s.offset) *
            Math.sin(s.lng),
          s.direction *
            3.0 *
            Math.sin(dt / s.speed + s.offset) *
            Math.sin(s.lng),
          s.direction * 3.0 * Math.cos(s.lng)
        );
        s.position.copy(position);
      });

      // if (audioAnalyser !== undefined) {
      //   const freq = audioAnalyser.getAverageFrequency();
      //   const remapped = 0.25 + freq / 20.0;
      //   const remappedCenter = Math.min(0.3 + 1.0 / (freq / 30.0), 2.0);
      //   visibleAudioSphere.scale.set(remapped, remapped, remapped);
      //   centerSphere.scale.set(remappedCenter, remappedCenter, remappedCenter);
      // }
    };
    render();

    return () => {
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
        <div className="top-logo-wrapper">
          <VisonMixingSenses />
        </div>
        <canvas ref={canvasRef} />
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
        <h3>Ausstellungsräume</h3>
        {exhibitions.map(exhibit => {
          const pictureUrl =
            exhibit.content.titleimage.length > 0
              ? exhibit.content.titleimage[0].url
              : "";
          return (
            <Link
              to={exhibit.content.active ? `/${exhibit.id}` : "#"}
              key={exhibit.id}
            >
              <div
                className={[
                  "exhibition-entry",
                  !exhibit.content.active ? "draft" : ""
                ].join(" ")}
              >
                <div
                  className="title-image"
                  style={{
                    backgroundImage: `url(${pictureUrl})`
                  }}
                ></div>
                <div className="column">
                  <h3 className="title">{exhibit.content.title}</h3>
                  <article>{exhibit.content.shortdescription}</article>
                  {exhibit.content.active ? (
                    <></>
                  ) : (
                    <h6>Demnächst verfügbar</h6>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <FoyerFooter />
    </div>
  );
};