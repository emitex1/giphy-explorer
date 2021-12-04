import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from 'twin.macro';
import 'styled-components/macro';
import {useAppSelector} from '../../store/hooks';
import Pagination from './Pagination';
import Modal from '../Modal/Modal';

interface gifProps {
  title: string;
  thumbnail: string;
  original: string;
  downsized: string;
  width: string;
  height: string;
}

const SearchResult = () => {
  const searchKeyword = useAppSelector( s => s.giphyReducer.searchKeyword );
  const [gifs, setGifs] = useState<gifProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const PAGE_SIZE = 12;
  const MAX_API_RESULT = 5000; // maximum result number of Giphy API
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentGif, setCurrentGif] = useState<gifProps>();

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
          original: d.images.original.url,
          downsized: d.images.downsized_small.mp4,
          width: d.images.original.width,
          height: d.images.original.height
        }));
        setGifs(gifsResult);
        setTotalCount(Math.min(MAX_API_RESULT, data.pagination.total_count));
        setIsLoading(false);
      });
    }
    else {
      console.log("Please provide a valid API key for Giphy");
    }
  }, [searchKeyword, offset]);

  const emptyCells = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  const styles = {
    mediaBox: tw`bg-gray-200 border-2 border-gray-400 mt-5`,
    renditionBox: tw`flex-1 justify-center items-center text-center mb-4 text-sm`
  }

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
            <div tw="flex items-center flex-col w-32 cursor-pointer" onClick={ (e) => {
              setCurrentGif(g);
              setIsOpen(true);
            }}>
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

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {currentGif && (
          <div tw="flex flex-col items-center">

            <div tw="text-center">
              <span tw="text-purple-dark font-bold text-2xl">{currentGif.title}</span>

              <img
                src={currentGif.original} alt=""
                width={currentGif.width} height={currentGif.height}
                css={styles.mediaBox}
              />
            </div>

            <div tw="flex h-1/6 mt-4 gap-4">

              <div css={styles.renditionBox}>
                <video preload="true" css={[styles.mediaBox, tw`h-full`]} autoPlay={true} loop={true}>
                  <source src={currentGif.downsized} type="video/mp4"></source>
                </video>
                Down Sized Video
              </div>

              <div css={styles.renditionBox}>
                <img src={currentGif.thumbnail} alt="" css={[styles.mediaBox, tw`h-full`]} />
                Static Image
              </div>

            </div>

          </div>
        )}
      </Modal>
    </>
  )
}

export default SearchResult;
