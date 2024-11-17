'use client';

import { useUserRedirect } from "@/hooks/useUserRedirect";

const Layout = ({ children }: {children: React.ReactNode}) => {
    useUserRedirect();

    return (
        <>
            {children}
        </>
    );
};

export default Layout;