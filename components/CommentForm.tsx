"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CommentForm() {
    const [authorName, setAuthorName] = useState("");
    const [content, setContent] = useState("");
    const [projectId, setProjectId] = useState("");
    const [threadId, setThreadId] = useState("");
    const [parentId, setParentId] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                author_name: authorName,
                content,
                project_slug: projectId,
                thread_slug: threadId,
                parent_id: parentId.trim() === "" ? null : parentId,
            }),
        });

        const result = await res.json();

        if (res.ok) {
            setMessage("✅ Comment posted successfully!");
            setAuthorName("");
            setContent("");
            setProjectId("");
            setThreadId("");
            setParentId("");
        } else {
            setMessage("❌ Error: " + result.message);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto mt-10">
            <CardHeader>
                <CardTitle>Post a Comment</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Your name"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        required
                    />
                    <Textarea
                        placeholder="Your comment..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <Input
                        placeholder="Project Slug"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        required
                    />
                    <Input
                        placeholder="Thread Slug"
                        value={threadId}
                        onChange={(e) => setThreadId(e.target.value)}
                        required
                    />
                    <Input
                        placeholder="Parent Comment ID (optional)"
                        value={parentId}
                        onChange={(e) => setParentId(e.target.value)}
                    />
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                    {message && <p className="text-sm mt-2">{message}</p>}
                </form>
            </CardContent>
        </Card>
    );
}
