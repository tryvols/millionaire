'use client';

import { MouseEventHandler, useEffect, useState, memo } from "react";
import { colors } from "../../../tailwind.config";
import { GameButtonThemes, gameButtonThemes } from "../../constants/themes";

type GameButtonState = "hover" | null;

interface GameButtonProps {
    text: string;
    variant: string;
    theme?: GameButtonThemes;
    className?: string;
    setFontColor?: boolean;
    onClick?: MouseEventHandler<SVGElement>;
}

export const GameButton = memo(({
    text,
    variant,
    theme = "inactive",
    className,
    onClick
}: GameButtonProps) => {
    const [buttonState, setButtonState] = useState<GameButtonState>(null);
    const [activeTheme, setActiveTheme] = useState<GameButtonThemes>(theme);
    const {textColor, borderColor, backgroundColor} = gameButtonThemes[activeTheme];

    useEffect(() => {
        setActiveTheme(theme);
    }, [theme]);

    useEffect(() => {
        setActiveTheme(buttonState || theme);
    }, [buttonState])

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 405 72"
            className={`${className || ""}`}
            onMouseOver={() => setButtonState("hover")}
            onMouseLeave={() => setButtonState(null)}
            onClick={(e) => onClick?.(e)}
        >
            <path stroke={borderColor} d="M388 36h17M0 36h17" />
            <path
                fill={backgroundColor}
                stroke={borderColor}
                d="M38.717 5.283A11.5 11.5 0 0 1 48.052.5h308.896a11.5 11.5 0 0 1 9.335 4.783L388.384 36l-22.101 30.717a11.5 11.5 0 0 1-9.335 4.783H48.052a11.5 11.5 0 0 1-9.335-4.783L16.616 36 38.717 5.283Z"
            />

            <text
                x="15%"
                y="53%"
                alignmentBaseline="middle"
                textAnchor="middle"
                fontSize="20"
                fill={colors["orange-3"]}
                className="font-semibold"
            >
                {variant.length > 1 ? variant[0] : variant}
            </text>

            <text
                x="20%"
                y="53%"
                alignmentBaseline="middle"
                textAnchor="left"
                fontSize="20"
                fill={textColor}
            >
                {text}
            </text>
        </svg>
    );
});
