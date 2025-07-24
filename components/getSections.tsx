'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { createClient } from '@/lib/supabase/client';
import getTimeAgo from "@/utils/getDate"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChevronRight, Plus } from "lucide-react";
import Link from "next/link";

interface Section {
    id: string;
    title: string;
    identifier: string;
    user_id: string;
    project_id: string;
    created_at: string;
}

// Update the prop to destructure projectId from props
export default function Sections({ projectId }: { projectId: string }) {
    const user = useAuthStore((state) => state.user);
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchSections = async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('threads')
                .select('*')
                .eq('project_id', projectId);

            if (error) {
                console.error('Error fetching sections:', error.message);
            } else if (data) {
                console.log(data);
                setSections(data);
            }

            setLoading(false);
        };

        fetchSections();
    }, [user, projectId]);

    return (
        <div className="mt-4 text-white">
            {loading ? (
                <div className="flex w-full flex-col gap-5">
                    {[1, 2, 3].map((_, i) => (
                        <Card
                            key={i}
                            className="h-[73px] w-full rounded-lg border-[#2F2F2F] border-2 bg-[#252525] p-4 animate-pulse"
                        >
                            <div className="flex flex-col h-full justify-between space-y-3">
                                <div className="h-2 bg-[#3a3a3a] rounded w-2/3" />
                                <div className="flex items-center gap-2">
                                    <div className="h-2 bg-[#3a3a3a] rounded w-1/3" />
                                    <div className="h-2 bg-[#3a3a3a] rounded w-12" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

            ) : (
                <>
                    {sections.length > 0 ? (
                        <div className="flex flex-col w-full gap-4">
                            {sections.map((section) => (
                                <Link
                                    href={`/dashboard/projects/${projectId}/comments/${section.identifier}`}
                                    key={section.id}
                                >
                                    <Card className="group w-full rounded-lg border-[#2F2F2F] border-2 mona-sans-regular cursor-pointer bg-[#252525] hover:bg-[#292929] hover:border-[#353535] transition-all duration-200">
                                        <CardHeader>
                                            <div className="flex justify-between items-center">
                                                <CardTitle className="mona-sans-regular text-md flex flex-col md:flex-row items-start justify-between w-full">
                                                    <p>{section.title}</p>

                                                    <div className="flex items-center gap-2">
                                                        <p className="text-left ">{section.identifier}</p>
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault(); // Prevent link navigation
                                                                navigator.clipboard.writeText(section.identifier);
                                                            }}
                                                            className="text-sm text-blue-400 hover:text-blue-500 transition"
                                                        >
                                                            Copy
                                                        </button>
                                                    </div>

                                                    <p>Created at: {getTimeAgo(section.created_at)}</p>
                                                </CardTitle>

                                                <ChevronRight className="ml-5 text-[#868686] group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            ))}

                        </div>
                    ) : (
                        <Link href={`/dashboard/projects/${projectId}/new-section`}>
                            <Card className="group pt-7 pb-6 w-full rounded-lg border-[#2F2F2F] border-2 mona-sans-regular cursor-pointer bg-[#252525] hover:bg-[#292929] hover:border-[#353535] transition-all duration-200">
                                <div className="flex items-center justify-center gap-3 flex-col">
                                    <Plus className="text-3xl scale-110" />
                                    <CardContent>Create a new Comment Section</CardContent>
                                </div>
                            </Card>
                        </Link>
                    )}
                </>
            )}
        </div>
    );
}
