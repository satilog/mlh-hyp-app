import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import Layout from "@/containers/Layout";
import EventDetail from "@/partials/Events/EventDetail";

import { NextPage } from "next";

const Home: NextPage = ({}) => {
  return (
    <Layout>
      <EventDetail></EventDetail>
    </Layout>
  );
};

export default Home;
