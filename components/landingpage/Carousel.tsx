import * as React from 'react';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';

const Carousel: React.FC = () => {
  const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <Marquee
      gradientWidth={0}
      direction="left"
      className="w-screen overflow-hidden min-h-[14rem] flex p-5"
    >
      {images.map((image, index) => (
        <div
          key={index}
          className="w-40 h-40 relative rounded-lg border-[3px] border-black hover:shadow-[3px_3px_0_0_rgb(0,0,0)] hover:-translate-x-[3px] hover:-translate-y-[3px] cursor-pointer mr-5 transition-[transform_300ms_ease,_box-shadow_300ms_ease,_-webkit-transform_300ms_ease]"
        >
          <Image src={`/images/clowns/${image}.png`} layout="fill" alt="" />
        </div>
      ))}
    </Marquee>
  );
};

export default Carousel;
