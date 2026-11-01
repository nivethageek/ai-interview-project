import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";

interface InterviewQuestion {
  question: string;
  answer: string;
}

export default async function Interview({
  params,
}: {
  params: Promise<{ interviewId: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { interviewId } = await params;
  const [interview] = await db
    .select()
    .from(MockInterview)
    .where(eq(MockInterview.mockId, interviewId))
    .limit(1);

  if (!interview) notFound();

  const clerkUser = await currentUser();
  const currentEmail = clerkUser?.primaryEmailAddress?.emailAddress;
  if (interview.createdBy !== userId && interview.createdBy !== currentEmail) {
    notFound();
  }

  let questions: InterviewQuestion[];
  try {
    const parsed: unknown = JSON.parse(interview.jsonMockeResp);
    if (!Array.isArray(parsed)) {
      notFound();
    }
    questions = parsed as InterviewQuestion[];
  } catch {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 p-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">
          {interview.jobPosition} Interview
        </h1>
        <p className="text-muted-foreground">
          {interview.jobDescription} · {interview.jobExperience} years of
          experience
        </p>
      </header>
      <section className="space-y-4" aria-label="Interview questions">
        {questions.map((item, index) => (
          <article
            key={`${index}-${item.question}`}
            className="space-y-2 rounded-lg border p-4"
          >
            <h2 className="font-semibold">
              Q{index + 1}: {item.question}
            </h2>
            <p className="text-sm text-muted-foreground">{item.answer}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
