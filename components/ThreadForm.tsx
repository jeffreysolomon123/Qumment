"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {redirect} from "next/navigation";

interface ThreadFormProps {
    projectId: string;
}

export function ThreadForm({ projectId }: ThreadFormProps) {
    const [threadTitle, setThreadTitle] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleThreadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("/api/create-thread", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: threadTitle, projectId }),
            });

            const result = await res.json();

            if (res.ok) {
                setMessage("✅ Thread created: " + result.identifier);
                setThreadTitle("");
                startTransition(() => {
                    redirect(`/dashboard/projects/${projectId}/section`);
                });
            } else {
                setMessage("❌ Error: " + result.message);
            }
        } catch {
            setMessage("❌ Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleThreadSubmit} className="w-full md:w-1/3 mt-4">
            <Input
                id="thread-title"
                type="text"
                placeholder="my amazing blog etc."
                className="mona-sans-regular"
                required
                value={threadTitle}
                onChange={(e) => setThreadTitle(e.target.value)}
                disabled={loading}
            />
            <Button
                type="submit"
                className="mt-3 shadow-inner-lg mona-sans-semibold main-color-bg text-white rounded-lg hover:scale-95 transition-transform duration-150 hover:bg-[#6C0E82] w-full"
                disabled={loading || isPending}
            >
                {loading ? "Creating..." : "Create Comment Section"}
            </Button>
            {message && <p className="text-sm text-center mt-2">{message}</p>}
        </form>
    );
}
