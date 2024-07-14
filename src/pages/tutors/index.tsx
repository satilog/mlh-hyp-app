import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import Layout from "@/containers/Layout";
import Tutors from "@/partials/Tutors";

import { NextPage } from "next";

const Home: NextPage = ({}) => {
  return (
    <Layout>
      <Tutors></Tutors>
    </Layout>
  );
};

export default Home;
