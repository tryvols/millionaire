export default function makeGetAnswerVariant(variants: string | Array<any>) {
  return (answerOrderNumber: number): string => variants[answerOrderNumber].toString();
}
