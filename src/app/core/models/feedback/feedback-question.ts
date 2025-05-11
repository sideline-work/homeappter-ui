export interface FeedbackQuestion {
  feedbackquestionId: number;
  question: string;
  type: string; //TODO: might be enum
  options: string[];
}
