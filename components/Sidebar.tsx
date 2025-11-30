import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { CirclePlus, LayoutPanelTop, MessageSquare, Settings } from "lucide-react";
import clsx from "clsx";

interface Props {
    isActivePage?: string;
}

export default function Sidebar({ isActivePage }: Props) {
    return (
        <div className="mona-sans-regular">
            <div className="px-2 py-3 space-y-2">
                <SidebarLink
                    href="/dashboard/projects"
                    label="Projects"
                    icon={<CirclePlus absoluteStrokeWidth />}
                    isActive={isActivePage === "/dashboard/projects"}
                />
            </div>
            <hr />
            <div className="px-2 py-3 space-y-2">
                <SidebarLink
                    href="/settings"
                    label="Settings"
                    icon={<Settings absoluteStrokeWidth />}
                    isActive={isActivePage === "settings"}
                />
            </div>
        </div>
    );
}

function SidebarLink({
                         href,
                         icon,
                         label,
                         isActive,
                     }: {
    href: string;
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
}) {
    return (
        <Button
            asChild
            size="sm"
            className={clsx(
                "w-full rounded-sm text-sm justify-start px-4 text-white",
                {
                    "bg-[#6C0E82] shadow-inner-lg hover:bg-[#6C0E82] active:bg-[#6C0E82]": isActive,
                    "bg-transparent hover:bg-[#252525] active:bg-[#252525]": !isActive,
                }
            )}
        >
            <Link
                href={href}
                className="flex items-center gap-2 mona-sans-semibold w-full"
                prefetch={true}
            >
                {icon}
                <span className="hidden sm:inline">{label}</span>
            </Link>
        </Button>
    );
}
