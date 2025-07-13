"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Comment = {
    id: string;
    parent_id: string | null;
    author_name: string;
    content: string;
    created_at: string;
};

export default function CommentFetcher() {
    const [projectId, setProjectId] = useState("");
    const [threadId, setThreadId] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchComments = async () => {
        setLoading(true);
        setError("");
        setComments([]);

        try {
            const res = await fetch(
                `http://qumment.vercel.app/api/comment?project_slug=${projectSlug}&thread_slug=${threadSlug}`
            );
            const result = await res.json();

            if (!res.ok) {
                setError(result.message || "Failed to fetch comments");
            } else {
                setComments(result.comments || []);
            }
        } catch (err: any) {
            setError(err.message || "Unexpected error occurred");
        }

        setLoading(false);
    };

    return (
        <Card className="w-full max-w-2xl mx-auto mt-10">
            <CardHeader>
                <CardTitle>Check Comments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
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
                    <Button onClick={fetchComments} disabled={loading} className="w-full">
                        {loading ? "Fetching..." : "Get Comments"}
                    </Button>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                {comments.length > 0 && (
                    <div className="space-y-4 mt-6">
                        <h3 className="text-lg font-semibold">Comments:</h3>
                        {comments.map((comment) => (
                            <div
                                key={comment.id}
                                className="border rounded p-3 bg-muted text-sm"
                            >
                                <p><strong>{comment.author_name}</strong> — <em>{new Date(comment.created_at).toLocaleString()}</em></p>
                                <p className="mt-1">{comment.content}</p>
                                {comment.parent_id && (
                                    <p className="text-xs text-muted-foreground mt-1">Reply to: {comment.parent_id}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
