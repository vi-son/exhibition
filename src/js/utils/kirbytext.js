import React from "react";

function bold(text) {
  const findBold = /(\*+\w+ \w+\*+)/;
  return text.split(findBold).map((substr, i) => {
    if (substr.includes("**")) {
      return <b key={i}>{substr.replaceAll("**", "")}</b>;
    } else {
      return substr;
    }
  });
}

function italic(text) {
  const findItalic = /( \*\w+ \w+\* )/;
  return text.split(findItalic).map((substr, i) => {
    if (substr[1] === "*") {
      return <i key={i}>{substr.replaceAll("*", "")}</i>;
    } else {
      return bold(substr);
    }
  });
}

function kt(text) {
  return italic(text);
}

export { kt };
