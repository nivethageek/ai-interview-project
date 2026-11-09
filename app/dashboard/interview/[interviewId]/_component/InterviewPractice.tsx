"use client";

import { useState } from "react";
import Webcam from "react-webcam";
import { Camera, CameraOff } from "lucide-react";

export interface InterviewQuestion {
  question: string;
  answer: string;
}

interface InterviewDetails {
  jobPosition: string;
  jobDescription: string;
  jobExperience: string;
}

interface InterviewPracticeProps {
  interview: InterviewDetails;
  questions: InterviewQuestion[];
}

export default function InterviewPractice({
  interview,
  questions,
}: InterviewPracticeProps) {
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [cameraError, setCameraError] = useState("");

  return (
    <main className="mx-auto my-10 w-full max-w-5xl space-y-8 px-5 sm:px-8">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary">
            Your practice session
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            {interview.jobPosition} Interview
          </h1>
          <p className="text-sm text-muted-foreground">
            {interview.jobDescription} · {interview.jobExperience} years of
            experience
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setCameraError("");
            setWebCamEnabled((enabled) => !enabled);
          }}
          className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 sm:self-auto"
          aria-pressed={webCamEnabled}
        >
          {webCamEnabled ? (
            <>
              <CameraOff size={16} aria-hidden="true" />
              Turn camera off
            </>
          ) : (
            <>
              <Camera size={16} aria-hidden="true" />
              Turn camera on
            </>
          )}
        </button>
      </header>

      {webCamEnabled && (
        <section
          className="overflow-hidden rounded-xl border bg-black"
          aria-label="Camera preview"
        >
          <Webcam
            audio={false}
            mirrored
            videoConstraints={{ facingMode: "user" }}
            onUserMediaError={() => {
              setCameraError(
                "Camera access was blocked. Check your browser permissions and try again.",
              );
              setWebCamEnabled(false);
            }}
            className="mx-auto aspect-video max-h-[480px] w-full object-cover"
          />
        </section>
      )}
      {cameraError && (
        <p role="alert" className="text-sm text-destructive">
          {cameraError}
        </p>
      )}
    </main>
  );
}
