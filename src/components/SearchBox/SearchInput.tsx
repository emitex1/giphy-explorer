// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from 'twin.macro';
import 'styled-components/macro';

const SearchInput = () => {
  return (
    <div tw="w-8/12 mx-auto my-5 text-center">
      <input type="text" tw="transition-all border-none rounded-md shadow-purple focus:shadow-purple-light bg-gray-300 focus:bg-white text-sm text-purple-600 px-4 py-2 mx-auto w-3/12 focus:w-5/12" placeholder="Enter your keyword here to search ..." />
    </div>
  )
}

export default SearchInput
