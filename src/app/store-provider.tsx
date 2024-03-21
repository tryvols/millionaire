'use client';

import React, { useRef } from 'react';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import type { AppStore } from '@/lib/store';
import { makeStore } from '@/lib/store';

interface Props {
  readonly children: ReactNode;
}

export default function StoreProvider({ children }: Props) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
