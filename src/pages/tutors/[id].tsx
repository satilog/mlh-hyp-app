import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import Layout from "@/containers/Layout";
import TutorDetail from "@/partials/Tutors/TutorDetail";

import { NextPage } from "next";

const Home: NextPage = ({}) => {
  return (
    <Layout>
      <TutorDetail></TutorDetail>
    </Layout>
  );
};

export default Home;
