import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import Layout from "@/containers/Layout";
import CattleList from "@/partials/CattleList";

import { NextPage } from "next";

const Home: NextPage = ({}) => {
  return (
    <Layout>
      <CattleList></CattleList>
    </Layout>
  );
};

export default Home;
