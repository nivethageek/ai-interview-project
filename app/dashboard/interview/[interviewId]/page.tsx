import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import InterviewPractice, {
  type InterviewQuestion,
} from "./_component/InterviewPractice";

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

  return <InterviewPractice interview={interview} questions={questions} />;
}
