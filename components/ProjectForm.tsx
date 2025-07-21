"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ProjectForm() {
    const [projectName, setProjectName] = useState("");
    const [message, setMessage] = useState("");

    const handleProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/create-project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: projectName }),
        });

        const result = await res.json();

        if (res.ok) {
            setMessage("✅ Project created: " + result.slug);
        } else {
            setMessage("❌ Error: " + result.message);
        }
    };

    return (
        <Card className="w-1/2">
            <CardHeader>
                <CardTitle className="text-xl">Create new project</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleProjectSubmit}>
                    <div>
                        <Input
                            id="project-name"
                            type="text"
                            placeholder="Enter your project"
                            required
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                        <Button type="submit" className="w-full mt-5">
                            Create
                        </Button>
                    </div>
                </form>
                {message && <p className="text-sm mt-2">{message}</p>}
            </CardContent>
        </Card>
    );
}
