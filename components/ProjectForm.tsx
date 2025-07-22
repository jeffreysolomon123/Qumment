"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export function ProjectForm() {
    const [projectName, setProjectName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isPending, startTransition] = useTransition(); // For smooth redirect

    const handleProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("/api/create-project", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: projectName }),
            });

            const result = await res.json();

            if (res.ok) {
                setMessage("✅ Project created: " + result.slug);
                startTransition(() => {
                    redirect("/dashboard/projects");
                });
            } else {
                setMessage("❌ Error: " + result.message);
            }
        } catch (err) {
            setMessage("❌ Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleProjectSubmit} className="w-full md:w-1/3">
            <Input
                id="project-name"
                type="text"
                placeholder="Enter your project"
                className="mona-sans-regular "
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                disabled={loading}
            />
            <Button
                type="submit"
                className="mt-3 shadow-inner-lg mona-sans-semibold main-color-bg text-white rounded-lg hover:scale-95 transition-transform duration-150 hover:bg-[#6C0E82] w-full"
                disabled={loading || isPending}
            >
                {loading ? "Creating..." : "Create Project"}
            </Button>
            {message && <p className="text-sm text-center">{message}</p>}
        </form>
    );
}
