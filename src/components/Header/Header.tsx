import React, { useEffect, useState, useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from 'twin.macro';
import 'styled-components/macro';
import giphyMp4 from "../assets/images/giphy-color-shooting.mp4";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setTimeout(() => {
      videoRef.current && videoRef.current.play();
      setIsVisible(true);
    }, 2000);
  }, []);

  return (
    <div tw="flex justify-center text-center items-center">
      <video ref={videoRef} preload="true" width="200">
        <source src={giphyMp4} type="video/mp4"></source>
        GIPHY Logo
      </video>

      <div css={[
        tw`text-white text-4xl bg-black transition-opacity duration-1000 opacity-5`,
        isVisible && tw`opacity-100`,
        "transition-duration: 6000ms;"
      ]}>GIPHY Explorer</div>
    </div>
  )
}

export default Header
