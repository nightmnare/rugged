import * as React from 'react';
import 'styles/globals.css';
import 'styles/fonts.css';
import {
  chain,
  configureChains,
  createClient,
  defaultChains,
  WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import config from 'config';

const { provider, webSocketProvider } = configureChains(
  [chain.mainnet, config.ftmChain],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={client}>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="colored"
      />
      <Component {...pageProps} />
    </WagmiConfig>
  );
};

export default MyApp;
