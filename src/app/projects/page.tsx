import { PROJECTS, type Project } from "@/lib/projects";

import styles from "./page.module.css";

export const metadata = {
    title: "Projects",
    description: "Things I've built. Agents, apps, websites, experiments.",
};

export default function ProjectsPage() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1 className={styles.title}>Things I've built.</h1>
                <p className={styles.lede}>
                    Some are live, some are quietly retired, a few are still
                    figuring out what they want to be. Reach out if any of
                    them spark a question.
                </p>
            </header>

            <ol className={styles.list}>
                {PROJECTS.map((project) => (
                    <li key={project.name} className={styles.item}>
                        <ProjectRow project={project} />
                    </li>
                ))}
            </ol>
        </div>
    );
}

function ProjectRow({ project }: { project: Project }) {
    const body = (
        <>
            <span className={styles.name}>{project.name}</span>
            <span className={styles.description}>{project.description}</span>
            <span className={styles.tags}>
                {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                        {tag}
                    </span>
                ))}
            </span>
            {project.href ? (
                <span className={styles.arrow} aria-hidden>
                    ↗
                </span>
            ) : null}
        </>
    );

    if (project.href) {
        return (
            <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className={styles.row}
            >
                {body}
            </a>
        );
    }

    return <span className={`${styles.row} ${styles.rowStatic}`}>{body}</span>;
}
