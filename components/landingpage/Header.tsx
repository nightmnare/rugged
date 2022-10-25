import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-16 flex justify-between items-center border-b-[0.25rem] border-black pl-5 bg-white z-50">
      <div className="h-full flex items-center gap-x-2">
        <Image src="/images/logo.png" alt="logo" width={35} height={35} />
      </div>
      <Link href="https://app.ruggedclowns.com/" passHref>
        <div className="w-52 h-full bg-black text-white hover:underline flex justify-center items-center cursor-pointer font-spacegrotesk">
          Dapp
        </div>
      </Link>
    </div>
  );
};

export default Header;
