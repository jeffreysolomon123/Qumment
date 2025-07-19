export default function ProjectsSkeleton() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Fake NavBar */}
            <div className="h-16 w-full bg-[#1c1c1c] animate-pulse" />

            <div className="flex flex-1">
                {/* Fake Sidebar */}
                <aside className="w-16 sm:w-64 bg-[#1a1a1a] animate-pulse" />

                {/* Main content skeleton */}
                <main className="flex-1 p-6 bg-[#121212] border-l-2 border-[#212121] space-y-4">
                    <div className="h-6 w-1/3 bg-[#2a2a2a] rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-[#2a2a2a] rounded animate-pulse" />
                    <div className="h-4 w-1/4 bg-[#2a2a2a] rounded animate-pulse" />
                </main>
            </div>
        </div>
    );
}
