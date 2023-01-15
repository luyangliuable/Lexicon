import React from 'react';


interface AppButtonProps {
    title?: string;
    tooltip?: string;
    onClick?: () => void;
    Icon?: any;
    iconOnRight?: boolean;
    className?: string;
    [id: string]: any;
}


interface CircleButtonProps {
    onClick: () => void;
    tooltip: string;
    Icon: React.FC;
    style?: any;
    className?: string;
    enable: boolean;
}



/**
 * Higher Order Component that applies a class name to the passed in component.
 *
 * @param {React.FC<AppButtonProps>} Button - The component to which the class name will be applied
 * @param {string} classNameToApply - The class name to apply to the component
 * @returns {React.FC<AppButtonProps>} - The component with the class name applied
 */
const applyClassName = (Button: React.FC<AppButtonProps>, classNameToApply: string) => {
    return ({ className, ...rest }: AppButtonProps) => (
        <Button className={`${className} ${classNameToApply}`} {...rest} />
    );
};


export const AppButton: React.FC<AppButtonProps> = ({
    title,
    onClick,
    Icon,
    iconOnRight,
    tooltip,
    className,
    ...rest
}) => (
    <button
        onClick={onClick}
        title={tooltip || title}
        className={`flex items-center leading-none pl-4 pr-4 py-2 transition duration-100 ease-in ${className}`}
        {...rest}
    >
        {!iconOnRight && Icon}
        {!iconOnRight && Boolean(Icon) && title && <span className="mx-1" />}
        <span>{title}</span>
        {iconOnRight && Boolean(Icon) && title && <span className="mx-1" />}
        {iconOnRight && Icon}
    </button>
);


export const CircleButton: React.FC<{
    onClick: () => void
    tooltip: string
    Icon: any
    className?: string
    enable: boolean
}> = ({ onClick, Icon, tooltip, className, enable }) => {

    if (!enable) return null

    return (
        <button
            onClick={onClick}
            className={`${className}`}
            title={tooltip}
        >
            {Icon}
        </button>
    )
}

export const RoundedAppButton = applyClassName(AppButton, "rounded-full");
export const DarkBlueAppButton = applyClassName(AppButton, "site-bg-dark-blue text-white");
export const WhiteAppButton = applyClassName(AppButton, "bg-white text-blue-900 hover:bg-gray-100");
