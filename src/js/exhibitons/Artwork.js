import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Artwork = ({ onEnter, onMeta, onBack, meta }) => {
  return (
    <>
      <div className="canvas-wrapper" onClick={onEnter}></div>
      <button className="btn-back" onClick={() => onBack()}>
        Zurück
      </button>
    </>
  );
};

export default Artwork;
