'use client'
import React, { useEffect, useState } from "react";
import '@/components/comments.css'
import {createClient} from "@/lib/supabase/client";

interface Comment {
    id: string;
    parent_id: string | null;
    author_name: string;
    content: string;
    likes: number;
    dislikes: number;
    created_at: string;
}

interface Props {
    projectSlug: string;
    threadSlug: string;
}

const Qumment = ({ projectSlug, threadSlug }: Props) => {
    const [loading, setLoading] = useState(true);
    const [groupedComments, setGroupedComments] = useState<Record<string, Comment[]>>({});
    const [activeReplies, setActiveReplies] = useState<Record<string, boolean>>({});
    const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
    const [visibleCount, setVisibleCount] = useState(5);



    const getTimeAgo = (dateString: string) => {
        const now = new Date();
        const date = new Date(dateString);
        const diff = (now.getTime() - date.getTime()) / 1000;
        if (diff < 60) return "just now";
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
        if (diff < 31104000) return `${Math.floor(diff / 2592000)} months ago`;
        return `${Math.floor(diff / 31104000)} years ago`;
    };

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            const res = await fetch(
                `https://ewjrpafiovbvmluylhlf.supabase.co/functions/v1/get-comments?project_slug=${projectSlug}&thread_slug=${threadSlug}`
            );
            const result = await res.json();
            const grouped = result.comments.reduce((acc: Record<string, Comment[]>, comment: Comment) => {
                const parentId = comment.parent_id || "root";
                if (!acc[parentId]) acc[parentId] = [];
                acc[parentId].push(comment);
                return acc;
            }, {});
            setGroupedComments(grouped);
            setLoading(false);
        };

        fetchComments();
    }, [projectSlug, threadSlug]);


    const deleteComment = async (comment_id: string) => {
        const supabase = createClient();
        const {
            data: { session },
        } = await supabase.auth.getSession();

        const res = await fetch("https://ewjrpafiovbvmluylhlf.supabase.co/functions/v1/delete-comment", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.access_token}`,
            },
            body: JSON.stringify({ comment_id }),
        });

        const data = await res.json();

        if(res.ok) {
            console.log("Successfully deleted comment", res);
        }
        if (!res.ok) {
            alert(data.error || "Failed to delete comment. You might not have permission.");
            return;
        }
        setGroupedComments((prev) => {
            const updated = { ...prev };
            for (const key in updated) {
                updated[key] = updated[key].filter((c) => c.id !== comment_id);
            }
            return updated;
        });

    };


    const renderComments = (parentId = "root") => {
        const comments = groupedComments[parentId] || [];
        const sortedComments = [...comments].sort((a, b) => {
            return sortOrder === "latest"
                ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                : new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        });

        const visible = parentId === "root" ? sortedComments.slice(0, visibleCount) : sortedComments;

        return visible.map((comment) => (
            <div key={comment.id} className="comment-box">
                <div className="comment-header">
                    <div className="comment-user-info">
                        <h2 className="user-avatar">
                            {comment.author_name.charAt(0).toUpperCase()}
                        </h2>
                        <h1 className="comment-username">{comment.author_name}</h1>
                    </div>
                    <span className="comment-time">{getTimeAgo(comment.created_at)}</span>
                </div>
                <h2 className="comment-content">{comment.content}</h2>
                <div className="comment-actions text-white">
                    {groupedComments[comment.id]?.length > 0 && (
                        <button
                            className="toggle-replies-btn text-white"
                            onClick={() =>
                                setActiveReplies((prev) => ({
                                    ...prev,
                                    [comment.id]: !prev[comment.id],
                                }))
                            }
                        >
                            {activeReplies[comment.id] ? "Hide Replies" : "Show Replies"}
                        </button>
                    )}
                    <button className="delete-btn" onClick={() => deleteComment(comment.id)}>Delete</button>
                </div>

                {activeReplies[comment.id] && renderComments(comment.id)}
            </div>
        ));
    };

    return (
        <div className="comment-section-container ">
            <div className="comment-header-bar">
                <div className="comment-count">
                    <h2 className="comments-main-title mona-sans-bold">Comments</h2>
                    <h2 className="comment-badge mona-sans-medium">
                        {Object.values(groupedComments).reduce((total, commentsArray) => total + commentsArray.length, 0)}
                    </h2>
                </div>
                <div className="sort-select-container">
                    <select
                        className="sort-select"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as "latest" | "oldest")}
                    >
                        <option value="oldest">Oldest</option>
                        <option value="latest">Most Recent</option>
                    </select>
                </div>
            </div>
            {loading ? (
                <div className="loading-skeleton-container">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="loading-sub-skeleton">
                            <div className="loading-1-container">
                                <div style={{ borderRadius: "9999px", width: "2rem", height: "0.3rem", background: "#ffff" }}></div>
                                <div style={{ borderRadius: "0.25rem", width: "25%", height: "0.2rem", background: "#e5e5e5" }}></div>
                            </div>
                            <div style={{ marginTop: "0.5rem", borderRadius: "0.25rem", width: "75%", height: "0.3rem", background: "#e5e5e5" }}></div>
                            <div style={{ borderRadius: "0.25rem", width: "66.666667%", height: "0.4rem", background: "#e5e5e5" }}></div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    {renderComments()}
                    {groupedComments["root"] && visibleCount < groupedComments["root"].length && (
                        <button className="load-more mona-sans-medium" onClick={() => setVisibleCount((prev) => prev + 5)}>
                            Load More...
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export { Qumment };
