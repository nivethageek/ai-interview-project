'use server';

import { auth, currentUser } from '@clerk/nextjs/server';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { getAI } from '@/utils/GeminiAI';

export interface InterviewQuestion {
  question: string;
  answer: string;
}

export async function createInterview(input: {
  role: string;
  techStack: string;
  experience: string;
}) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('You must be signed in to create an interview.');
  }

  const role = input.role.trim();
  const techStack = input.techStack.trim();
  const experience = input.experience.trim();

  if (!role || !techStack || !experience || !/^\d+$/.test(experience)) {
    throw new Error('Enter a role, tech stack, and valid years of experience.');
  }

  const questionCount = Number(process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT ?? 5);
  if (!Number.isInteger(questionCount) || questionCount < 1 || questionCount > 20) {
    throw new Error('The configured interview question count is invalid.');
  }

  const interaction = await getAI().interactions.create({
    model: 'gemini-3.8-flash',
    input: `Job position: ${role}, Job description: ${techStack}, Years of experience: ${experience}. Based on the job position, description, and experience, generate ${questionCount} important interview questions along with their answers.`,
    response_format: {
      text: {
        mime_type: 'application/json',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              question: { type: 'string' },
              answer: { type: 'string' },
            },
            required: ['question', 'answer'],
          },
        },
      },
      type: 'array',
    },
  });

  if (!interaction.output_text) {
    throw new Error('The AI did not return interview questions.');
  }

  const questions: unknown = JSON.parse(interaction.output_text);
  if (
    !Array.isArray(questions) ||
    questions.some(
      (question) =>
        typeof question?.question !== 'string' ||
        typeof question?.answer !== 'string',
    )
  ) {
    throw new Error('The AI returned interview questions in an invalid format.');
  }

  const clerkUser = await currentUser();
  const createdBy = clerkUser?.primaryEmailAddress?.emailAddress ?? userId;
  const mockId = uuidv4();

  await db.insert(MockInterview).values({
    mockId,
    jsonMockeResp: JSON.stringify(questions),
    jobDescription: techStack,
    jobPosition: role,
    jobExperience: experience,
    createdBy,
    createdAt: new Date().toISOString().slice(0, 10),
  });

  return { mockId, questions: questions as InterviewQuestion[] };
}
