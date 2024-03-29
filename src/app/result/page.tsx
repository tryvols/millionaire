'use client';

import React from 'react';
import { useAppSelector } from '@/lib/hooks';
import StandardPageLayout from '@/app/layouts/standard-page-layout';
import formatAmount from '@/utils/format-amount';

export default function Home() {
  const earned = useAppSelector((state) => state.game.earned);
  const currencySign = useAppSelector((state) => state.game.config.currencySign);

  return (
    <StandardPageLayout
      headingSection={(
        <div className="flex flex-col text-center md:text-left gap-2 w-full">
          <h3 className="text-lg md:text-2xl font-semibold text-grey-4 leading-5 md:leading-9">
            Total score:
          </h3>

          {earned !== undefined ? (
            <h1 className="text-[2.2rem] md:text-[3.5rem] leading-9 md:leading-[4rem] font-semibold">
              {`${formatAmount(earned, currencySign)} `}
              earned
            </h1>
          ) : null}
        </div>
      )}
      buttonText="Try again"
    />
  );
}
