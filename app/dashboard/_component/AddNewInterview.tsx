"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createInterview, type InterviewQuestion } from "../actions";

function AddNewInterview() {
  const [openDiaglog, setOpenDialog] = useState(false);
  const [role, setRole] = useState("");
  const [techStack, setTechStack] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [interviewQuestions, setInterviewQuestions] = useState<
    InterviewQuestion[]
  >([]);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setSubmitError("");
    try {
      const result = await createInterview({
        role,
        techStack,
        experience,
      });
      setInterviewQuestions(result.questions);
      setOpenDialog(false);
      router.push(`/dashboard/interview/${result.mockId}`);
    } catch (error) {
      console.error("Error creating mock interview:", error);
      setSubmitError(
        error instanceof Error ? error.message : "Unable to create interview.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-100 hover:shadow-md cursor-pointer transition-all mb-6"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDiaglog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us about your job interview
            </DialogTitle>
            <DialogDescription>
              Add details about your job position/role, Job description and
              years of experience
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div>
              <div className="p-2">
                <label>Add your Job Role/ Job Position</label>
                <Input
                  placeholder="Ex FullStack Developer"
                  required
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                />
              </div>
              <div className="p-2">
                <label>Job description/ Tech stack (In Short)</label>
                <Input
                  required
                  placeholder="React, Angular, NodeJS, SQL etc"
                  value={techStack}
                  onChange={(event) => setTechStack(event.target.value)}
                />
              </div>
              <div className="p-2">
                <label>Add your years of experience</label>
                <Input
                  required
                  type="number"
                  placeholder="6"
                  max={50}
                  value={experience}
                  onChange={(event) => setExperience(event.target.value)}
                />
              </div>
              {submitError && (
                <p role="alert" className="px-2 text-sm text-destructive">
                  {submitError}
                </p>
              )}
              <div className="flex p-6 gap-5 justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  disabled={loading}
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Generating..." : "Start Interview"}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Render the questions on the screen after receiving them */}
      {interviewQuestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-xl mb-4">Generated Mock Interview:</h3>
          {interviewQuestions.map((item, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg bg-card shadow-sm"
            >
              <h4 className="font-semibold text-primary mb-2">
                Q{index + 1}: {item.question}
              </h4>
              <p className="text-muted-foreground text-sm">
                <span className="font-medium text-foreground">Answer:</span>{" "}
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddNewInterview;
