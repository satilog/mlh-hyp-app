import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import Layout from "@/containers/Layout";
import Events from "@/partials/Events";

import { NextPage } from "next";

const Home: NextPage = ({}) => {
  return (
    <Layout>
      <Events></Events>
    </Layout>
  );
};

export default Home;
