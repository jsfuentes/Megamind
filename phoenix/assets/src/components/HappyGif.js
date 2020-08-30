import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as Sentry from "@sentry/browser";

const debug = require("debug")("app:HappyGif");

const happyGifSrc = [
  "https://media.tenor.com/images/02d6514c550f6b5ab07391d619944220/tenor.gif",
  "https://media2.giphy.com/media/WnNmXarZ7ibyYbTRXL/giphy.gif",
  "https://thumbs.gfycat.com/BewitchedSecretGalah-size_restricted.gif",
  "https://media3.giphy.com/media/mbhseRYedlG5W/200.gif",
  "https://thumbs.gfycat.com/FavorableBoldConey-size_restricted.gif",
  "https://media1.tenor.com/images/b62c90b7ff9cec3af3017b9a31967714/tenor.gif?itemid=4946910",
  "https://media.tenor.com/images/b7aa76b4a9fb5ef1d3cf5ef2bf1f2e6e/tenor.gif",
  "https://i.pinimg.com/originals/77/a1/ea/77a1ea36809acdd39f922d7df5ed502f.gif",
  "https://i.gifer.com/1Egv.gif",
  "https://media1.tenor.com/images/2274d51b68fe3d539644308ab92fedcc/tenor.gif?itemid=17771756",
  "https://media2.giphy.com/media/d2Zjut4zj3bYt4SA/source.gif",
  "https://media0.giphy.com/media/2sXf9PbHcEdE1x059I/giphy.gif",
  "https://media2.giphy.com/media/3ohryhNgUwwZyxgktq/giphy.gif",
  "https://media2.giphy.com/media/8hZGWC35QgSbGe3QLM/source.gif",
  "https://media2.giphy.com/media/S5yqNNTQlEZfqQ7InC/200.gif",
  "https://i.pinimg.com/originals/2c/ed/e2/2cede24f0be91fb8d76e2494879ccb5a.gif",
  "https://gif-finder.com/wp-content/uploads/2014/08/Minions-Joy.gif",
  "https://media2.giphy.com/media/zrOYtLqfh2qPu/source.gif",
  "https://steamuserimages-a.akamaihd.net/ugc/288601066174804771/63D8692CFCEE934BCD19800EEF5AB910A0986676/",
  "https://ohmy.disney.com/wp-content/uploads/2015/06/Little-Anna-from-Frozen-dancing-in-the-snow.gif",
  "https://media0.giphy.com/media/YFis3URdQJ6qA/giphy.gif",
  "https://38.media.tumblr.com/f22cd208f369d7117fc867f4dfb44a9a/tumblr_n4n6h18BA51trmkp7o1_500.gif",
  "https://bestanimations.com/Music/Dancers/happy-dance/happy-dance-animated-gif-image-51.gif",
  "https://media.tenor.com/images/3439dd41fd856d66abd1ee4cd42e7670/tenor.gif",
  "https://media.tenor.com/images/3439dd41fd856d66abd1ee4cd42e7670/tenor.gif",
];

export default function HappyGif(props) {
  return (
    <img src={happyGifSrc[Math.floor(Math.random() * happyGifSrc.length)]} />
  );
}
