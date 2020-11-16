// node_modules imports
import React from "react";
// SVG imports
import MixingSenses from "../../../assets/svg/mixing-senses.svg";
import IconInstagram from "../../../assets/svg/instagram.svg";
import IconTwitter from "../../../assets/svg/twitter.svg";
// Style imports
import "../../sass/foyer/Footer.sass";

const Twitter = ({ url }) => {
  return (
    <a href={url} target="_blank" className="icon">
      <IconTwitter />
    </a>
  );
};

const Insta = ({ url }) => {
  return (
    <a href={url} target="_blank" className="icon">
      <IconInstagram />
    </a>
  );
};

const FoyerFooter = () => {
  return (
    <footer className="foyer-footer">
      <h3>Credits</h3>

      <main className="columns">
        <div>
          <h4>• ein projekt von</h4>
          <ul className="list">
            <li>
              <a href="https://www.instagram.com/thekalanguhood/">Kalangu</a>
              <Insta url={"https://www.instagram.com/thekalanguhood/"} />
            </li>
            <li>
              <a href="https://pendeloque.de/" target="_blank">
                Pendeloque Lichtkunst
              </a>
              <Insta url={"https://www.instagram.com/thekalanguhood/"} />
              <Twitter url={"https://twitter.com/pendeloque_art"} />
            </li>
          </ul>
        </div>

        <div>
          <h5>• kuration</h5>
          <ul className="list">
            <li>Benjamin Doubali</li>
            <li>Leon Fuchs</li>
            <li>Guido Schmidt</li>
          </ul>
        </div>

        <div>
          <h5>• kooperationen</h5>
          <ul className="list">
            <li>
              <a href="https://thearticle.hypotheses.org/" target="_blank">
                the article
              </a>
              <Insta url={"https://www.instagram.com/the_article_/"} />
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
          <h5>• besonderer dank</h5>
          <ul className="list">
            <li>
              <b>the article</b>
            </li>
            <li>
              <a href="https://www.torial.com/kira.kramer" target="_blank">
                Kira Kramer
              </a>
              <Insta url={"https://www.instagram.com/januskoepfig/"} />
            </li>
            <li>
              <b>kunstverein hockenheim</b>
            </li>
            <li>
              <a href="https://www.instagram.com/nic.kda/" target="_blank">
                Nicole Fuchs
              </a>
              <Insta url="https://www.instagram.com/nic.kda/" />
            </li>
            <li>
              <a href="http:www.kunstverein-hockenheim.de/" target="_blank">
                Gisela & Franz Späth
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5>• musik</h5>
          <ul className="list">
            <li>
              <a
                href="https://www.instagram.com/thekalanguhood/"
                target="_blank"
              >
                Leon Fuchs
              </a>
              <Insta url={"https://www.instagram.com/thekalanguhood/"} />
            </li>
            <li>
              <a href="http://www.facebook.com/nmbr4" target="_blank">
                Klaus Herrmann
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5>• redaktion</h5>
          <ul className="list">
            <li>
              <a href="https://twitter.com/bekado_" target="_blank">
                Benjamin Doubali
              </a>
              <Twitter url={"https://twitter.com/bekado_"} />
            </li>
          </ul>
        </div>

        <div>
          <h5>• programmierung & design</h5>
          <ul className="list">
            <li>
              <a href="https://www.guidoschmidt.cc" target="_blank">
                Guido Schmidt
              </a>
              <Insta url={"https://www.instagram.com/guidoschmidt.cc"} />
            </li>
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
