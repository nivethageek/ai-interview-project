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
import { ai } from "@/utils/GeminiAI";

interface InterviewQuestion {
  question: string;
  answer: string;
}

function AddNewInterview() {
  const [openDiaglog, setOpenDialog] = useState(false);
  const [role, setRole] = useState("");
  const [techStack, setTechStack] = useState("");
  const [experience, setExperience] = useState("");

  // Track loading and parsed response array
  const [loading, setLoading] = useState(false);
  const [interviewQuestions, setInterviewQuestions] = useState<
    InterviewQuestion[]
  >([]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const questionCount = process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT;

    const inputPrompt =
      "Job position: " +
      role +
      ", Job description: " +
      techStack +
      ", Years of experience: " +
      experience +
      ". Based on the job position, description, and experience, generate " +
      questionCount +
      " important interview questions along with their answers.";
    try {
      const interaction = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input: inputPrompt,
        // CORRECT INTERACTIONS API STRUCTURE
        response_format: {
          text: {
            mime_type: "application/json",
            schema: {
              type: "array", // Must be lowercase string
              items: {
                type: "object", // Must be lowercase string
                properties: {
                  question: { type: "string" },
                  answer: { type: "string" },
                },
                required: ["question", "answer"],
              },
            },
          },
          type: "array",
        },
      });

      const rawJson = interaction.output_text;
      if (rawJson) {
        const parsedResponse: InterviewQuestion[] = JSON.parse(rawJson);

        setInterviewQuestions(parsedResponse);

        setOpenDialog(false);
      }
    } catch (error) {
      console.error("Error getting or parsing API response:", error);
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
