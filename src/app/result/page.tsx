'use client';

import React from 'react';
import { useAppSelector } from '@/store/hooks';
import StandardPageLayout from '@/components/layouts/standard-page-layout';
import formatAmount from '@/utils/format-amount';
import gameConfig from '@/config/game-config.json';

export default function Home() {
  const earned = useAppSelector((state) => state.earned);

  return (
    <StandardPageLayout
      headingSection={(
        <div className="flex flex-col text-center md:text-left gap-2 w-full">
          <h3 className="text-lg md:text-2xl font-semibold text-grey-4 leading-5 md:leading-9">
            Total score:
          </h3>

          {earned !== undefined ? (
            <h1 className="text-[2.2rem] md:text-[3.5rem] leading-9 md:leading-[4rem] font-semibold">
              {`${formatAmount(earned, gameConfig.currencySign)} `}
              earned
            </h1>
          ) : null}
        </div>
      )}
      buttonText="Try again"
    />
  );
}
