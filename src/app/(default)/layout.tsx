import Footer from "@components/layout/Footer";
import Navbar from "@components/layout/Navbar";
import React from "react";

export default function Layout ({
    children,
}: Readonly<{
    children: React.ReactNode,
}>): React.ReactNode {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};