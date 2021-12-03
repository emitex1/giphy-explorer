import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from 'twin.macro';
import 'styled-components/macro';
import Header from './components/Header/Header';
import SearchBox from './components/SearchBox/SearchBox';

function App() {
  return (
    <div tw="container ">
      <Header />
      <SearchBox />
    </div>
  );
}

export default App;
