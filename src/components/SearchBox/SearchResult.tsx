import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from 'twin.macro';
import 'styled-components/macro';
import {useAppSelector} from '../../store/hooks';
import Pagination from './Pagination';

interface gifProps {
  title: string;
  thumbnail: string;
  original: string;
}

const SearchResult = () => {
  const searchKeyword = useAppSelector( s => s.giphyReducer.searchKeyword );
  const [gifs, setGifs] = useState<gifProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const PAGE_SIZE = 12;

  useEffect(() => {
    setOffset(0);
  }, [searchKeyword]);

  useEffect(() => {
    if(process.env.REACT_APP_GIPHY_API_KEY) {
      setIsLoading(true);
      fetch("http://api.giphy.com/v1/gifs/search?api_key=" + process.env.REACT_APP_GIPHY_API_KEY + "&q=" + searchKeyword + "&limit=" + PAGE_SIZE + "&offset=" + offset)
      .then(response => response.json())
      .then(data => {
        const gifsResult: gifProps[] = data && data.data && data.data.map( (d: any) => ({
          title: d.title,
          thumbnail: d.images.fixed_width_small_still.url,
          original: d.images.original.url
        }));
        setGifs(gifsResult);
        setTotalCount(data.pagination.total_count);
        setIsLoading(false);
      });
    }
    else {
      console.log("Please provide a valid API key for Giphy");
    }
  }, [searchKeyword, offset]);

  const emptyCells = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <>
      <div tw="w-8/12 mx-auto my-14 text-center">

        {isLoading && (
          <div tw="flex flex-wrap justify-center items-center gap-5 animate-pulse">
            { emptyCells.map( (e) => (
              <div tw="w-32 h-32 bg-gray-800 flex justify-around items-center"></div>
            ))}
          </div>
        )}

        <div tw="flex flex-wrap justify-center gap-6">
          {!isLoading && gifs.map( g => (
            <div tw="flex items-center flex-col w-32 cursor-pointer">
              <img src={g.thumbnail} alt={g.title} tw="transition-all w-24 hover:w-28" />
              <span tw="text-gray-300 overflow-auto">{g.title}</span>
            </div>
          ))}
        </div>
      </div>

      {
        searchKeyword && (
          <Pagination totalCount={totalCount} pageSize={PAGE_SIZE} offset={offset} setOffset={setOffset} />
        )
      }
    </>
  )
}

export default SearchResult;
