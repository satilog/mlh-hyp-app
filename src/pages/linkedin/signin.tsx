import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import Layout from "@/containers/Layout";
import LinkedInSignIn from "@/partials/LinkedIn/SignIn";

import { NextPage } from "next";

const Home: NextPage = ({
}) => {
  return (
    <Layout>
      <LinkedInSignIn></LinkedInSignIn>
    </Layout>
  );
}

export default Home;