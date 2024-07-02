export type Voice = {
  voiceId: string;
  provider: string;
};

export type Message = {
  role: string;
  content: string;
};

export type Model = {
  model: string;
  messages: Message[];
  provider: string;
  temperature: number;
};

export type Conversation = {
  id: string;
  orgId: string;
  name: string;
  voice: Voice;
  createdAt: string;
  updatedAt: string;
  model: Model;
  recordingEnabled: boolean;
  firstMessage: string;
  voicemailMessage: string;
  endCallMessage: string;
  clientMessages: string[];
  serverMessages: string[];
  endCallPhrases: string[];
  isServerUrlSecretSet: boolean;
};

export type Conversations = Conversation[];

export type CallMessage = {
  role: string;
  time: number;
  message: string;
  secondsFromStart: number;
  source?: string;
  endTime?: number;
};

export type CostBreakdown = {
  stt: number;
  llm: number;
  tts: number;
  vapi: number;
  total: number;
  llmPromptTokens: number;
  llmCompletionTokens: number;
  analysisCostBreakdown: {
      summary: number;
      structuredData: number;
      successEvaluation: number;
      summaryPromptTokens: number;
      summaryCompletionTokens: number;
      structuredDataPromptTokens: number;
      successEvaluationPromptTokens: number;
      structuredDataCompletionTokens: number;
      successEvaluationCompletionTokens: number;
  };
};

export type Analysis = {
  summary: string;
  successEvaluation: string;
};

export type WebCall = {
  id: string;
  assistantId: string;
  type: string;
  startedAt: string;
  endedAt: string;
  transcript: string;
  recordingUrl: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
  orgId: string;
  cost: number;
  webCallUrl: string;
  status: string;
  endedReason: string;
  messages: CallMessage[];
  stereoRecordingUrl: string;
  costBreakdown: CostBreakdown;
  analysis: Analysis;
};