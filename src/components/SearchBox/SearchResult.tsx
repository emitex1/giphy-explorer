import {useAppSelector} from '../../store/hooks';

const SearchResult = () => {
  const searchKeyword = useAppSelector( s => s.giphyReducer.searchKeyword );

  return (
    <div>
      SearchResult :
      { searchKeyword }
    </div>
  )
}

export default SearchResult;
