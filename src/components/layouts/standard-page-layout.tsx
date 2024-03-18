'use client';

import { ReactNode, useCallback } from "react";
import { SimpleButton } from "@/components/simple-button";
import Image from "next/image";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { readyToStartGame } from "@/store/features/game/game-slice";

interface StandardPageLayoutProps {
    containerClassName?: string;
    buttonText: string;
    headingSection: ReactNode;
}

export const StandardPageLayout = ({
    containerClassName,
    buttonText,
    headingSection
}: StandardPageLayoutProps) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const startGame = useCallback(() => {
        dispatch(readyToStartGame());
        router.prefetch("/game");
        router.push("/game");
    }, []);

    return (
        <main className={`${containerClassName || ""} flex h-dvh flex-col md:flex-row items-center justify-between p-4 pt-8 md:p-20 bg-grey-1`}>
            <Image
                className="flex-1 max-sm:w-11/12 max-md:w-8/12"
                src="/hand.svg"
                alt="Cool hand"
                width={180}
                height={37}
                priority
            />

            <div className="flex flex-1 flex-col max-md:items-center justify-items-start justify-between md:justify-normal md:gap-16 max-md:w-full">
                {headingSection}

                <SimpleButton
                    className="mb-12 max-sm:w-full max-md:w-8/12"
                    text={buttonText}
                    onClick={startGame}
                />
            </div>
        </main>
    );
}
