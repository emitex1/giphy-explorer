import { useState } from 'react';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from 'twin.macro';
import 'styled-components/macro';
import { setSearchKeyword } from '../../store/actions/giphyActions';

const SearchInput = () => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();

  const dispatchKeyword = () => {
    dispatch(setSearchKeyword(keyword));
  }

  const handleKeyPress = (e: any) => {
    if(e.charCode === 13) {
      dispatchKeyword();
    }
  }

  return (
    <div tw="w-8/12 mx-auto py-4 text-center bg-black">
      <input
        type="text"
        tw="transition-all border-none rounded-md shadow-purple focus:shadow-purple-light bg-gray-300 focus:bg-white text-sm text-purple-600 px-4 py-2 mx-auto w-3/12 focus:w-5/12"
        placeholder="Enter your keyword here to search ..."
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        onKeyPress={handleKeyPress}
        onBlur={dispatchKeyword}
      />
    </div>
  )
}

export default SearchInput
