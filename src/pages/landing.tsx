import React, { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import Layout from "@/containers/Layout";
import { FlipWords } from "@/components/ui/flip-words";
import { GoogleGeminiEffect } from "@/components/ui/connection-students-effect";
import { FeaturesSectionDemo } from "@/components/ui/features-section";

export default function Landing() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    })

    const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
    const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
    const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
    const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
    const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

    const words = ["events", "mentors", "upskill", "collaborate"];
    return (
        <Layout>
            <div className="flex flex-col h-[30vh] items-center justify-center">
                <h1 className="text-6xl font-bold">Welcome to the APP</h1>
                <div className="text-2xl">We will help you with<FlipWords className="text-3xl" words={words} /> </div> <br />
            </div>
            <FeaturesSectionDemo />
        </Layout>
    );
};