// node_modules imports
import React from "react";
// SVG imports
import MixingSenses from "../../../assets/svg/mixing-senses.svg";
// Style imports
import "../../sass/foyer/Footer.sass";

const FoyerFooter = () => {
  return (
    <footer className="foyer-footer">
      <h3>Credits</h3>
      <main className="columns">
        <div>
          <h5>
            • Sprecher <i>Sätze</i>
          </h5>
          <ul className="list">
            <li>Marvin Merkhofer</li>
          </ul>
        </div>
        <div>
          <h5>• kooperationen</h5>
          <ul className="list">
            <li>
              <a href="https://thearticle.hypotheses.org/" target="_blank">
                the article
              </a>
            </li>
            <li>
              <a href="https://getkirby.com/" target="_blank">
                kirby cms
              </a>
            </li>
            <li>
              <a href="http://www.kunstverein-hockenheim.de/" target="_blank">
                kunstverein hockenheim
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5>• musikproduktion</h5>
          <ul className="list">
            <li>Leon Fuchs</li>
          </ul>
        </div>
      </main>
      <small className="legal">
        <ul className="list">
          <li>
            <a href="https://mixing-senses.art/de/impressum" target="_blank">
              impressum
            </a>
          </li>
          <li>
            <a
              href="https://mixing-senses.art/de/datenschutzerklaerung"
              target="_blank"
            >
              datenschutzerklärung
            </a>
          </li>
        </ul>
      </small>
      <div className="logo-wrapper">
        <MixingSenses />
      </div>
      <small className="copyright">2020 • mixing-senses.art</small>
    </footer>
  );
};

export default FoyerFooter;
