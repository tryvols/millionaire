import React from 'react';
import StandardPageLayout from './layouts/standard-page-layout';

export default function Home() {
  return (
    <StandardPageLayout
      buttonText="Start"
      containerClassName="bg-game-start-background"
      headingSection={(
        <h1 className="text-[2.2rem] md:text-[3.5rem] leading-9 md:leading-[4rem] font-semibold max-md:text-center w-full">
          Who wants to be a millionaire?
        </h1>
      )}
    />
  );
}
