// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from 'twin.macro';
import 'styled-components/macro';

interface PaginationProps {
  totalCount: number;
  pageSize: number;
  offset: number;
  setOffset: any;
}

const Pagination = ({totalCount, pageSize, offset, setOffset}: PaginationProps) => {

  const handlePrevClick = () => {
    if(offset === 0)
      return;

    setOffset(Math.max(0, offset - pageSize));
  }

  const pageNumber = Math.ceil(totalCount / pageSize);
  const currentPage = offset / pageSize;

  const handleNextClick = () => {
    if(currentPage + 1 === pageNumber)
      return;
    setOffset(offset + pageSize);
  }

  const classes = {
    btn: tw`h-10 w-10 bg-purple-700 hover:bg-purple-600 rounded-sm p-1 cursor-pointer`,
    disabledCursor: tw`cursor-not-allowed`
  }

  return (
    <div tw="flex justify-center items-center gap-10 mb-10">
      <div css={[classes.btn, offset === 0 && classes.disabledCursor]} onClick={handlePrevClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </div>

      {currentPage+1} / {pageNumber}

      <div css={[classes.btn, (currentPage+1 === pageNumber) && classes.disabledCursor]} onClick={handleNextClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  )
}

export default Pagination;
