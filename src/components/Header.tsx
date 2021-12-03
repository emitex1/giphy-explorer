import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from 'twin.macro';
import 'styled-components/macro';
import giphyMp4 from "../assets/images/giphy-color-shooting.mp4";

const Header = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setTimeout(() => {
      console.log(videoRef.current);
      videoRef.current && videoRef.current.play();
    }, 4000);
  }, []);

  return (
    <div>
      <video ref={videoRef} preload="true" width="400">
        <source src={giphyMp4} type="video/mp4"></source>
        Your browser does not support HTML5 video. Please update your browser.
      </video>
    </div>
  )
}

export default Header
