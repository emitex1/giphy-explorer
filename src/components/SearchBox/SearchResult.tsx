import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from 'twin.macro';
import 'styled-components/macro';
import {useAppSelector} from '../../store/hooks';

interface gifProps {
  title: string;
  thumbnail: string;
  original: string;
}

const SearchResult = () => {
  const searchKeyword = useAppSelector( s => s.giphyReducer.searchKeyword );
  const [gifs, setGifs] = useState<gifProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if(process.env.REACT_APP_GIPHY_API_KEY) {
      setIsLoading(true);
      fetch("http://api.giphy.com/v1/gifs/search?api_key=" + process.env.REACT_APP_GIPHY_API_KEY + "&q=" + searchKeyword)
      .then(response => response.json())
      .then(data => {
        const gifsResult: gifProps[] = data && data.data && data.data.map( (d: any) => ({
          title: d.title,
          thumbnail: d.images.fixed_width_small_still.url,
          original: d.images.original.url
        }));
        setGifs(gifsResult);
        setIsLoading(false);
      });
    }
    else {
      console.log("Please provide a valid API key for Giphy");
    }
  }, [searchKeyword])

  return (
    <div tw="w-8/12 mx-auto my-5 text-center">

      {isLoading && (
        <span>Loading, Please Wait ...</span>
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
  )
}

export default SearchResult;
