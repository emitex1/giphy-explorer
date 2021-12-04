import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from 'twin.macro';
import 'styled-components/macro';
import {useAppSelector} from '../../store/hooks';
import Pagination from './Pagination';
import Modal from '../Modal/Modal';
import GifProps from './GifProps';
import Renditions from './Renditions';
import GridLoading from './GridLoading';
import readGiphyData from './readGiphyData';

const SearchResult = () => {
  const searchKeyword = useAppSelector( s => s.giphyReducer.searchKeyword );
  const [gifs, setGifs] = useState<GifProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const PAGE_SIZE = 12;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentGif, setCurrentGif] = useState<GifProps>();

  useEffect(() => {
    setOffset(0);
  }, [searchKeyword]);

  const readData = async () => {
    setIsLoading(true);

    const { gifs, totalCount } = await readGiphyData(searchKeyword, PAGE_SIZE, offset);
    if(gifs) setGifs(gifs);
    if(totalCount) setTotalCount(totalCount);

    setIsLoading(false);
  }

  useEffect( () => {
    readData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword, offset]);

  return (
    <>
      <div tw="w-8/12 mx-auto my-14 text-center">

        {isLoading && (
          <GridLoading />
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
          <Renditions gif={currentGif} />
        )}
      </Modal>
    </>
  )
}

export default SearchResult;
