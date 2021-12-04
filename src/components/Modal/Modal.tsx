import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from 'twin.macro';
import 'styled-components/macro';

interface ModalProps {
  children: any;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({children, isOpen, onClose}: ModalProps) => {

  if(isOpen)
    return (
      <div tw="absolute w-full h-full top-0 left-0">

        <div tw="flex justify-center items-center w-full h-full backdrop-filter backdrop-blur-lg bg-purple-dark bg-opacity-70" onClick={onClose}>

          <div tw="bg-white text-black w-min min-w-1/3 h-auto min-h-300 p-10 rounded-md opacity-100">
            {children}
          </div>

        </div>

      </div>
    );
  else
      return <></>;
}

export default Modal;
