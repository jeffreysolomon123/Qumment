import Sidebar from "@/components/Sidebar"
import NavBar from "@/components/NavBar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            <NavBar />
            <aside className="w-64"> {/* Sidebar here */}
                <Sidebar />
            </aside>
            <main className="flex-1 p-4">
                {children} {/* Changes on navigation */}
            </main>
        </div>
    );
}