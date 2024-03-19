'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ReactLoading from 'react-loading';
import gameConfig from '../../config/game-config.json';
import GameButton from '@/components/game-button/game-button';
import makeGetAnswerVariant from '../../utils/get-answer-variant';
import answerBigLetterVariants from '../../constants/answer-variants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { answerQuestion, startGame } from '@/store/features/game/game-slice';
import { QuestionAnswer } from '@/types/config.types';
import { GameButtonThemes } from '@/constants/themes';
import timeout from '@/utils/timeout';
import GameAmounts from './game-amounts';

export default function GamePage() {
  // UI
  const [isAmountVisible, setAmountVisibility] = useState(false);
  const [isCorrectAnswerVisible, setIsCorrectAnswerVisible] = useState(false);
  const [activeAnswer, setActiveAnswer] = useState<QuestionAnswer | null>(null);

  // state
  const dispatch = useAppDispatch();
  const activeStep = useAppSelector((state) => state.activeStep);
  const gameStatus = useAppSelector((state) => state.gameStatus);

  // navigation
  const router = useRouter();

  useEffect(() => {
    if (!router || !dispatch) {
      return;
    }

    if (gameStatus === 'ready_to_start') {
      router.prefetch('/result');
      setTimeout(() => {
        dispatch(startGame());
      }, 1000);
    }

    if (gameStatus === 'finished') {
      router.push('/result');
    }
  }, [router, dispatch, gameStatus]);

  const getAnswerVariant = useMemo(() => makeGetAnswerVariant(answerBigLetterVariants), []);

  const getAnswerTheme = (answer: QuestionAnswer): GameButtonThemes => {
    if (isCorrectAnswerVisible && answer.id !== activeAnswer?.id && answer.isCorrect) {
      return 'correct';
    }

    if (answer.id !== activeAnswer?.id) {
      return 'inactive';
    }

    if (!isCorrectAnswerVisible) {
      return 'selected';
    }

    if (answer.isCorrect) {
      return 'correct';
    }

    return 'wrong';
  };

  const onClickAnswer = async (answer: QuestionAnswer) => {
    setActiveAnswer(answer);
    await timeout(gameConfig.waitingForAnswerHighlightMs);
    setIsCorrectAnswerVisible(true);
    await timeout(gameConfig.answerHighlightDurationMs);
    setIsCorrectAnswerVisible(false);
    setActiveAnswer(null);
    dispatch(answerQuestion(answer));
  };

  if (gameStatus === 'ready_to_start') {
    return (
      <div className="flex flex-row justify-center items-center h-dvh w-dvw bg-orange-3">
        <ReactLoading
          type="spinningBubbles"
          color="white"
          height={128}
          width={128}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-row bg-grey-1 h-dvh w-dvw">
      <div className="h-full w-dvw lg:flex-1">
        <Image
          className="block absolute lg:hidden w-6 h-6 top-4 right-4 z-0"
          src="/menu.svg"
          alt="Close"
          width={24}
          height={24}
          priority
          onClick={() => setAmountVisibility(true)}
        />

        <div className="flex flex-col justify-between h-full px-20 py-32 max-lg:px-0 max-lg:pb-6 max-lg:text-center">
          <h1 className="lg:max-w-[624px] text-lg md:text-3xl leading-5 md:leading-9 font-semibold">
            {activeStep.question}
          </h1>

          <div className="flex flex-row justify-center 2xl:justify-start flex-wrap gap-y-2 lg:gap-y-8">
            {activeStep.answers.map((answer, id) => (
              <GameButton
                key={answer.text}
                text={answer.text}
                className="max-w-[420px]"
                variant={getAnswerVariant(id)}
                theme={getAnswerTheme(answer)}
                onClick={() => onClickAnswer(answer)}
                hoverTheme={activeAnswer ? getAnswerTheme(answer) : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      <GameAmounts
        activeStep={activeStep}
        isVisible={isAmountVisible}
        onHide={() => setAmountVisibility(false)}
      />
    </div>
  );
}
