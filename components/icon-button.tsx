import { cn } from "@/lib/utils";
import { ReactElement } from "react";

interface IconButttonProps {
    onClick: () => void;
    icon: ReactElement;
    className?: string;
    disabled?: boolean;
    title?: string;
}

const IconButton = (props: IconButttonProps) => {
    const { onClick, icon, className, disabled, title } = props;
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
                className
            )}
            disabled={disabled}
            title={title}
        >
            {icon}
        </button>
    )
}

export default IconButton;