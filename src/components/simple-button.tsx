import { MouseEventHandler } from "react";

interface ButtonProps {
    text: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const SimpleButton = ({
    text,
    className,
    onClick
}: ButtonProps) => {
    return (
        <button
            className={`${className || ""} h-12 md:h-16 w-[18.5rem] bg-orange-3 hover:bg-orange-2 active:bg-orange-4 text-white-1 rounded-lg md:rounded-xl font-semibold text-sm md:text-xl leading-4 md:leading-6`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
