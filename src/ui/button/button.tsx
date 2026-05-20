import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import styles from "./button.module.css";

/*
 * Slim port of the robotnet "lab" button — same visual recipe (paper
 * gradient, hairline border, inset highlight, 1px press dip). Variants:
 * brand (the cloudy-blue CTA), secondary (quiet paper), ghost (text-only).
 *
 * Renders as a Next Link for internal paths, an <a> for external/scheme
 * hrefs (mailto:, tel:, http://…), or a <button> when onClick is given.
 */

type Variant = "brand" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type SharedProps = {
    variant?: Variant;
    size?: Size;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    className?: string;
    children: ReactNode;
};

function isInternalHref(href: string): boolean {
    return href.startsWith("/") && !href.startsWith("//");
}

function classes(variant: Variant, size: Size, extra?: string) {
    return [styles.btn, styles[variant], styles[size], extra]
        .filter(Boolean)
        .join(" ");
}

function Inner({
    leadingIcon,
    trailingIcon,
    children,
}: Pick<SharedProps, "leadingIcon" | "trailingIcon" | "children">) {
    return (
        <>
            {leadingIcon ? <span className={styles.icon}>{leadingIcon}</span> : null}
            <span>{children}</span>
            {trailingIcon ? <span className={styles.icon}>{trailingIcon}</span> : null}
        </>
    );
}

type LinkButtonProps = SharedProps &
    Omit<ComponentProps<"a">, "children" | "className"> & {
        href: string;
    };

export function LinkButton({
    variant = "secondary",
    size = "md",
    leadingIcon,
    trailingIcon,
    className,
    children,
    href,
    ...rest
}: LinkButtonProps) {
    const cls = classes(variant, size, className);
    const inner = (
        <Inner leadingIcon={leadingIcon} trailingIcon={trailingIcon}>
            {children}
        </Inner>
    );

    if (isInternalHref(href)) {
        return (
            <Link {...rest} href={href} className={cls}>
                {inner}
            </Link>
        );
    }

    return (
        <a {...rest} href={href} className={cls}>
            {inner}
        </a>
    );
}

type ButtonProps = SharedProps &
    Omit<ComponentProps<"button">, "children" | "className">;

export function Button({
    variant = "secondary",
    size = "md",
    leadingIcon,
    trailingIcon,
    className,
    children,
    ...rest
}: ButtonProps) {
    return (
        <button
            {...rest}
            type={rest.type ?? "button"}
            className={classes(variant, size, className)}
        >
            <Inner leadingIcon={leadingIcon} trailingIcon={trailingIcon}>
                {children}
            </Inner>
        </button>
    );
}
