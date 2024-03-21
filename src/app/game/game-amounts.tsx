'use client';

import React, { FC, memo, useMemo } from 'react';
import Image from 'next/image';
import { cloneDeep } from 'lodash';

import GameAmount from '@/components/game-amount';
import gameConfig from '@/config/game-config.json';
import { AmountThemes } from '@/constants/themes';
import { GameStep } from '@/types/config.types';
import formatAmount from '@/utils/format-amount';
import { useAppSelector } from '@/lib/hooks';

interface GameAmountsProps {
  activeStep: GameStep;
  isVisible: boolean;
  onHide: () => void;
}

const GameAmounts: FC<GameAmountsProps> = memo(({
  activeStep,
  isVisible,
  onHide,
}: GameAmountsProps) => {
  const steps = useAppSelector((state) => state.game.steps);
  const orderedSteps = useMemo(() => cloneDeep(steps).sort((a, b) => b.amount - a.amount), [steps]);

  const getAmountTheme = (step: GameStep): AmountThemes => {
    if (step.amount < activeStep.amount) {
      return 'received';
    }

    if (step.amount === activeStep.amount) {
      return 'active';
    }

    return 'default';
  };

  return (
    <div className={`${isVisible ? 'flex' : 'hidden'} lg:flex flex-col justify-center bg-grey-1 sm:bg-white-1 h-full w-dvw sm:w-fit max-lg:absolute max-sm:pt-16 max-sm:pb-8 z-10 right-0`}>
      <Image
        className="block absolute lg:hidden w-6 h-6 top-4 right-4"
        src="/close.svg"
        alt="Close"
        width={24}
        height={24}
        priority
        onClick={onHide}
      />

      <div className="flex flex-col gap-2 w-full sm:w-[379px] h-fit">
        {orderedSteps.map((step) => (
          <GameAmount
            key={step.amount}
            text={formatAmount(step.amount, gameConfig.currencySign)}
            theme={getAmountTheme(step)}
          />
        ))}
      </div>
    </div>
  );
});

export default GameAmounts;
