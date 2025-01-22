'use client'
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { FaAlignRight, FaMoon } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getHeaderRes } from "@/helper/index";

// Custom VisuallyHidden Component
function VisuallyHidden({ children }: { children: React.ReactNode }) {
    return (
        <span
            style={{
                position: "absolute",
                width: "1px",
                height: "1px",
                margin: "-1px",
                padding: "0",
                overflow: "hidden",
                clip: "rect(0, 0, 0, 0)",
                whiteSpace: "nowrap",
                border: "0",
            }}
        >
            {children}
        </span>
    );
}

export default function Component() {
    interface NavLink {
        title: string;
        href: string;
    }

    interface HeaderData {
        title: string;
        navlinks: NavLink[];
        login: {
            href: string;
            title: string;
        };
    }

    const [data, setData] = useState<HeaderData>({
        title: "",
        navlinks: [],
        login: { href: "", title: "" },
    });

    async function getHeaderInfo() {
        try {
            const res = await getHeaderRes();
            console.log(res);
            setData(res);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getHeaderInfo();
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full bg-white ">
            <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-0 ">
                <Link href="/" className="flex items-center gap-2" prefetch={false}>
                    <h1 className="text-2xl text-black font-bold">{data.title}</h1>
                </Link>
                <nav className="hidden items-center gap-14 text-md font-medium md:flex">
                    {data.navlinks?.map((navlink, index) => (
                        <Link
                            key={index}
                            href={navlink.href}
                            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            prefetch={false}
                        >
                            {navlink.title}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-4">
                    <Toggle aria-label="Toggle dark mode" className="rounded-full">
                        <FaMoon size={60} className="text-3xl font-extrabold text-gray-700 dark:text-gray-400" />
                    </Toggle>
                    <Link href={data.login.href}>
                        <Button className="px-4 bg-black border-2 border-black text-white rounded-full font-semibold  hover:scale-105 hover:bg-transparent hover:text-black  ">{data.login.title || "Login"}</Button>
                    </Link>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" className="rounded-full md:hidden bg-white  hover:bg-gray-100">
                                <FaAlignRight className="h-5 w-5  text-gray-500 dark:text-gray-400" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="md:hidden">
                            <DialogTitle>
                                <VisuallyHidden>
                                    <h2>Navigation Menu</h2>
                                </VisuallyHidden>
                            </DialogTitle>
                            <div className="grid gap-4 p-4">
                            <Link href="/" className="flex items-center gap-2" prefetch={false}>
                    <h1 className="text-2xl text-black font-bold">{data.title}</h1>
                </Link>
                                {data.navlinks?.map((navlink, index) => (
                                    <Link
                                        key={index}
                                        href={navlink.href}
                                        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                        prefetch={false}
                                    >
                                        {navlink.title}
                                    </Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
