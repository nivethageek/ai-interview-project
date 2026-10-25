import { pgSchema, serial, text , varchar} from "drizzle-orm/pg-core";

export const interviewSchema = pgSchema('interviewSchema');

export const MockInterview = interviewSchema.table('mockerInterview',{
    id: serial('id').primaryKey(),
    jsonMockeResp:text('jsonMockeResp').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDescription: varchar('jobDescription').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull(),
    mockId: varchar('mockId').notNull()
})