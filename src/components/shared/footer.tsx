export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
                <p className="text-sm text-muted-foreground">
                    &copy; {currentYear}{" "}
                    <span className="font-semibold">NextBoiler</span>. All rights
                    reserved.
                </p>
                <p className="text-sm text-muted-foreground">
                    Built with Next.js, Prisma &amp; TypeScript
                </p>
            </div>
        </footer>
    );
}
