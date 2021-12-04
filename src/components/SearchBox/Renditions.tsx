// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from 'twin.macro';
import 'styled-components/macro';
import RenditionsProps from './RenditionsProps';

const styles = {
  mediaBox: tw`bg-gray-200 border-2 border-gray-400 mt-5`,
  renditionBox: tw`flex-1 justify-center items-center text-center mb-4 text-sm`
}

const Renditions = ({gif}: RenditionsProps) => {
  return (
    <div tw="flex flex-col items-center">

      <div tw="text-center">
        <span tw="text-purple-dark font-bold text-2xl">{gif.title}</span>

        <img
          src={gif.original} alt=""
          width={gif.width} height={gif.height}
          css={styles.mediaBox}
        />
      </div>

      <div tw="flex h-1/6 mt-4 gap-4">

        <div css={styles.renditionBox}>
          <video preload="true" css={[styles.mediaBox, tw`h-full`]} autoPlay={true} loop={true}>
            <source src={gif.downsized} type="video/mp4"></source>
          </video>
          Down Sized Video
        </div>

        <div css={styles.renditionBox}>
          <img src={gif.thumbnail} alt="" css={[styles.mediaBox, tw`h-full`]} />
          Static Image
        </div>

      </div>

    </div>
  )
}

export default Renditions
