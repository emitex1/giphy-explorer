// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from 'twin.macro';
import 'styled-components/macro';

// I hard coded it, due to performance issues
const emptyCells = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const GridLoading = () => {
  return (
    <div tw="flex flex-wrap justify-center items-center gap-5 animate-pulse">
      { emptyCells.map( (e) => (
        <div tw="w-32 h-32 bg-gray-800 flex justify-around items-center"></div>
      ))}
    </div>
  )
}

export default GridLoading
