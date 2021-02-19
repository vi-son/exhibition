// node_modules imports
import React from "react";
// SVG imports
import IconInstagram from "../../../assets/svg/instagram.svg";
import IconTwitter from "../../../assets/svg/twitter.svg";
// Style imports
import "@sass/6-components/Footer.sass";

const Twitter = ({ url }) => {
  return (
    <a href={url} target="_blank" className="icon">
      <IconTwitter />
    </a>
  );
};

const Instagram = ({ url }) => {
  return (
    <a href={url} target="_blank" className="icon">
      <IconInstagram />
    </a>
  );
};

const FoyerFooter = () => {
  return (
    <footer className="foyer-footer">
      <div className="feedback-hint">
        <h4 className="title">Wir freuen uns über Feedback</h4>
        <p className="text">
          Du hast Wünsche, Ideen, Verbesserungsvorschläge oder auch einfach nur
          ein Lob? Für solche Fälle haben wir ein Feedback-Formular für dich
          eingerichtet.
          <br />
          In jedem Fall schon mal ganz herzlichen Dank 👍
        </p>
        <a
          className="btn-feedback"
          href="https://docs.google.com/forms/d/e/1FAIpQLSdITyBdNVHoGN-UaAw0FJdckg4bsLobDMqNxDUnYpFVUUUpWg/viewform"
          target="_blank"
        >
          Feedback
        </a>
      </div>
      <h3>Credits</h3>

      <main className="columns">
        <div>
          <h4>• ein projekt von</h4>
          <ul className="list">
            <li>
              <a href="https://www.instagram.com/thekalanguhood/">Kalangu</a>
              <Instagram url={"https://www.instagram.com/thekalanguhood/"} />
            </li>
            <li>
              <a href="https://pendeloque.de/" target="_blank">
                Pendeloque Lichtkunst
              </a>
              <Instagram url={"https://www.instagram.com/thekalanguhood/"} />
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
              <Instagram url={"https://www.instagram.com/the_article_/"} />
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
              <Instagram url={"https://www.instagram.com/januskoepfig/"} />
            </li>
            <li>
              <b>kunstverein hockenheim</b>
            </li>
            <li>
              <a href="https://www.instagram.com/nic.kda/" target="_blank">
                Nicole Fuchs
              </a>
              <Instagram url="https://www.instagram.com/nic.kda/" />
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
              <Instagram url={"https://www.instagram.com/thekalanguhood/"} />
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
              <Instagram url={"https://www.instagram.com/guidoschmidt.cc"} />
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
      <small className="copyright">2020 • mixing-senses.art</small>
      <div className="version">
        <span>
          <b>Version: </b> {process.env.VERSION.tag}
        </span>
        <span>
          <b>Commit: </b> {process.env.VERSION.commit}
        </span>
        <span>
          <b>Bugs/Code: </b>
          <a href={process.env.VERSION.package.bugs.url} target="_blank">
            {process.env.VERSION.package.name}
          </a>
        </span>
      </div>
    </footer>
  );
};

export default FoyerFooter;
