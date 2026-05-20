import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import styles from "./prose.module.css";

export function Prose({ children }: { children: string }) {
    return (
        <article className={styles.prose}>
            <Markdown remarkPlugins={[remarkGfm]}>{children}</Markdown>
        </article>
    );
}
