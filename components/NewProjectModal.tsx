
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";

interface NewProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (name: string) => void;
}

export default function NewProjectModal({
                                            isOpen,
                                            onClose,
                                            onSubmit,
                                        }: NewProjectModalProps) {
    const [projectName, setProjectName] = useState("");

    const handleSubmit = () => {
        if (projectName.trim()) {
            onSubmit(projectName.trim());
            setProjectName("");
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md rounded-lg bg-[#1E1E1E] p-6 border border-[#333]">
                    <Dialog.Title className="text-white text-lg font-semibold mb-4">
                        Create New Project
                    </Dialog.Title>
                    <input
                        type="text"
                        placeholder="Project Name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-[#2C2C2C] border border-[#444] text-white mb-4 outline-none focus:ring-2 focus:ring-[#6C0E82]"
                    />
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button className="bg-[#6C0E82] text-white" onClick={handleSubmit}>
                            Create
                        </Button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
