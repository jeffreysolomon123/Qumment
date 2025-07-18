import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {CirclePlus, LayoutPanelTop, MessageSquare, Settings} from "lucide-react";


export default function Sidebar() {
    return (
        <div className="p-5 space-y-2 mona-sans-regular">
            <SidebarLink href="/" icon={<CirclePlus absoluteStrokeWidth />} label="Projects" />
            <SidebarLink href="/" icon={<MessageSquare absoluteStrokeWidth />} label="Comments" />
            <SidebarLink href="/" icon={<LayoutPanelTop absoluteStrokeWidth />} label="Comment Sections" />
            <hr className="" />
            <SidebarLink href="/" icon={<Settings absoluteStrokeWidth />} label="Settings" />
        </div>
    );
}

function SidebarLink({
                         href,
                         icon,
                         label,
                     }: {
    href: string;
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <Button
            asChild
            size="sm"
            className="w-full text-sm justify-start bg-transparent hover:bg-[#3C3C3C] active:bg-[#3C3C3C]"
        >
            <Link
                href={href}
                className="flex items-center gap-2 text-white mona-sans-semibold w-full"
            >
                {icon}
                <span className="hidden md:inline">{label}</span>
            </Link>
        </Button>
    );
}
