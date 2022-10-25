import * as React from 'react';
import Link from 'next/link';

const LibraryButton: React.FC = () => {
  return (
    <Link href={'/ftm/library'} passHref>
      <a target="_blank" rel="noopener noreferrer">
        <div className="page-mint flex flex-col justify-center items-center">
          <div className="card">
            <>
              <div className="flex justify-center items-center">
                <button className="py-2 px-8 text-sm lg:text-md lg:py-4 lg:px-20 border-[1.5px] text-black border-black rounded bg-white shadow-[4px_4px_0_0_rgb(0,0,0)] font-agrandir">
                  Your Own NFT &nbsp;
                </button>
              </div>
            </>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default LibraryButton;
