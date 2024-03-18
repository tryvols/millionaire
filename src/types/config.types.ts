export type QuestionAnswer = Readonly<{
    id: number;
    text: string;
    isCorrect?: boolean;
}>;

export type GameStep = Readonly<{
    amount: number;
    question: string;
    answers: QuestionAnswer[];
}>;

export type GameConfig = Readonly<{
    steps: Array<GameStep>;
    currencySign: string;
    waitingForAnswerHighlightMs: number;
    answerHighlightDurationMs: number;
}>;
