"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ThreadForm() {
    const [threadTitle, setThreadTitle] = useState("");
    const [projectId, setProjectId] = useState("");
    const [message, setMessage] = useState("");

    const handleThreadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/create-thread", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: threadTitle,
                projectId: projectId,
            }),
        });

        const result = await res.json();

        if (res.ok) {
            setMessage(`✅ Thread created: ${result.identifier}`);
        } else {
            setMessage(`❌ Error: ${result.message}`);
        }
    };

    return (
        <Card className="w-1/2">
            <CardHeader>
                <CardTitle className="text-xl">Create New Thread</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleThreadSubmit} className="space-y-4">
                    <Input
                        id="thread-title"
                        type="text"
                        placeholder="Enter thread title"
                        required
                        value={threadTitle}
                        onChange={(e) => setThreadTitle(e.target.value)}
                    />
                    <Input
                        id="project-id"
                        type="text"
                        placeholder="Enter project ID"
                        required
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                    />
                    <Button type="submit" className="w-full">
                        Create Thread
                    </Button>
                </form>
                {message && <p className="text-sm mt-2">{message}</p>}
            </CardContent>
        </Card>
    );
}
