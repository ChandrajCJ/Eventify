"use client";
import React, { useEffect, useState } from 'react'
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getHeroRes } from '@/helper';


const HeroPage = () => {
    interface HeroData {
        title: string;
        background_video: {
            uid: string;
            filename: string;
            url: string;
        };
        description: string;
        explore_events: {
            href: string;
            title: string;
        };
    }

    const [loading, setLoading] = useState(true);

    const [data, setData] = useState<HeroData>({
        title: "",
        background_video: { uid: "", filename: "", url: "" },
        description: "",
        explore_events: { href: "", title: "" },
    });

    async function getHeroInfo() {
        try {
            const res = await getHeroRes();
            console.log(res.background_video.url);
            setData(res);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getHeroInfo();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute min-h-full min-w-full object-cover"
                >
                    <source
                        src={data.background_video.url}
                        type="video/mp4"
                    />
                    "Your browser does not support the video tag."
                </video>
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-up">
                    {data.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fade-up animation-delay-200">
                    {data.description}
                </p>
                <Link
                    href="#events"
                    className="inline-flex items-center px-8 py-4 bg-white border-2 border-white text-gray-900 rounded-full font-semibold text-lg transition-all duration-200 hover:bg-transparent hover:scale-105 animate-fade-up hover:text-white animation-delay-300"
                >
                    {data.explore_events.title}
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </div>
        </div>
    )
}

export default HeroPage