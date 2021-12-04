import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from 'twin.macro';
import 'styled-components/macro';
import Header from './components/Header/Header';
import SearchInput from './components/SearchInput/SearchInput';
import SearchResult from './components/SearchBox/SearchResult';

function App() {
  return (
    <div tw="container">
      <div tw="sticky top-0">
        <Header />
        <SearchInput />
      </div>
      <SearchResult />
    </div>
  );
}

export default App;
