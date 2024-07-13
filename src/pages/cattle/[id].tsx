import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import Layout from "@/containers/Layout";
import Cattle from "@/partials/Cattle";

import { NextPage } from "next";

const Home: NextPage = ({}) => {
  return (
    <Layout>
      <Cattle></Cattle>
    </Layout>
  );
};

export default Home;
