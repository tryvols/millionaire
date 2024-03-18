export const makeGetAnswerVariant = (variants: string | Array<any>) => (answerOrderNumber: number): string => {
    return variants[answerOrderNumber].toString();
};
