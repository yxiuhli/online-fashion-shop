export default function Layout ({
    children,
}: Readonly<{
    children: React.ReactNode
}>): React.ReactNode {
    return (
        <>
        {children}
        </>
    );
};