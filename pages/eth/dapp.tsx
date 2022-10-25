import 'antd/dist/antd.css';

import DappCard from '../../components/eth/DappCard';

const BTC = '/images/coins/BTC_coin.svg';
const CRV = '/images/coins/CRV_coin.svg';
const DAI = '/images/coins/DAI_coin.svg';
const ETH = '/images/coins/ETH_coin.svg';
const SHIBA = '/images/coins/SHIBA_coin.svg';
const UNI = '/images/coins/UNI_coin.svg';
const USDT = '/images/coins/USDT_coin.svg';
const AVAX = '/images/coins/AVAX_coin.svg';
const BNB = '/images/coins/BNB_coin.svg';
const FTM = '/images/coins/FTM_coin.svg';
const MATIC = '/images/coins/MATIC_coin.svg';
const SUSHI = '/images/coins/SUSHI_coin.svg';

import Header from '../../components/eth/Header';

function DappPage() {
  return (
    <div className=" flex flex-col items-center justify-center pb-10 bg-light-cream w-full h-screen pt-10 px-6 relative">
      {/* <div className="flex flex-row w-full h-16 items-start justify-start">
                <button className="absolute top-6 left-6 bg-opacity-0" onClick={(_) => navigate(-1)}>
                    <ArrowBackIcon fontSize="medium" className='transition-all text-glow-orange rounded-full outline outline-4 outline-offset-2 outline-glow-orange hover:bg-white hover:outline-white' />
                </button>
                <span className='w-full text-center text-glow-orange text-4xl mb-6 font-extrabold'>D app</span>
            </div> */}
      <Header
        isBackButton={true}
        title="D app"
        isVerify={false}
        wallet={true}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full overflow-y-auto ss mt-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, index) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <DappCard
              coin={
                index === 1
                  ? BTC
                  : index === 2
                  ? CRV
                  : index === 3
                  ? DAI
                  : index === 4
                  ? ETH
                  : index % 8 === 5
                  ? SHIBA
                  : index === 6
                  ? UNI
                  : index === 7
                  ? MATIC
                  : index === 8
                  ? USDT
                  : index === 9
                  ? AVAX
                  : index === 10
                  ? BNB
                  : index === 11
                  ? FTM
                  : SUSHI
              }
              earn={
                index === 1
                  ? 'WBTC'
                  : index === 2
                  ? 'CRV'
                  : index === 3
                  ? 'DAI'
                  : index === 4
                  ? 'ETH'
                  : index % 8 === 5
                  ? 'SHIBA'
                  : index === 6
                  ? 'UNI'
                  : index === 7
                  ? 'WMATIC'
                  : index === 8
                  ? 'USDT'
                  : index === 9
                  ? 'WAVAX'
                  : index === 10
                  ? 'WBNB'
                  : index === 11
                  ? 'WFTM'
                  : 'SUSHI'
              }
              // LockingPeriod="15"
              apy={14.71}
              staked={0}
              daiEarned={0}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DappPage;
