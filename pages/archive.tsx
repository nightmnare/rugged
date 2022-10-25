import type { NextPage } from "next";

import Header from "@components/landingpage/Header";
import Description from "@components/landingpage/Description";
import Carousel from "@components/landingpage/Carousel";
import Grid from "@components/landingpage/Grid";
import Network from "@components/landingpage/Network";
import Lic from "@components/landingpage/Lic";
import Footer from "@components/landingpage/Footer";

const Archive: NextPage = () => {
  return (
    <>
      <Header />
      <Description />
      <Carousel />
      <Grid />
      <Network />
      <Lic />
      <Footer />
    </>
  );
};

export default Archive;
