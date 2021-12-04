import GifProps from "./GifProps";
// import readGiphyDataProps from "./readGiphyDataProps";

const MAX_API_RESULT = 5000; // maximum result number of Giphy API

const readGiphyData = async (searchKeyword: string, pageSize: number, offset: number) => {
  if(process.env.REACT_APP_GIPHY_API_KEY) {
    const rawData = await fetch("http://api.giphy.com/v1/gifs/search?api_key=" + process.env.REACT_APP_GIPHY_API_KEY + "&q=" + searchKeyword + "&limit=" + pageSize + "&offset=" + offset)
    const data: any = await rawData.json();
      
    const gifs: GifProps[] = data && data.data && data.data.map( (d: any) => ({
      title: d.title,
      thumbnail: d.images.fixed_width_small_still.url,
      original: d.images.original.url,
      downsized: d.images.downsized_small.mp4,
      width: d.images.original.width,
      height: d.images.original.height
    }));

    const totalCount = Math.min(MAX_API_RESULT, data.pagination.total_count);

    return {
      gifs,
      totalCount
    };

  }
  else {
    console.log("Please provide a valid API key for Giphy");
    return {
      gifs: [],
      totalCount: 0
    };
  }
}

export default readGiphyData;
