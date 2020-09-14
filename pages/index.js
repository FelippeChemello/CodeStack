import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Skill from '../components/skill'

export default function Home() {
    return (
        <>
            <Head>
                <title>Felippe Jaqson Chemello</title>
                <link rel="icon" href="/profile.jpg" />
            </Head>

            <div className={styles.container}>
                <div className = {styles.sidebar}>
                    <div className = {styles.sidebarBio}>
                        <img src = "/profile.jpg" className = {styles.profile} /> 
                        
                        <h1 className={styles.title}> 
                            FELIPPE JAQSON CHEMELLO
                        </h1>

                        <p className={styles.description}>
                            Sou desenvolvedor full-stack, atualmente trabalhando na KingHost.
                            Estudante de Ciências da Computação.
                            Entusiasta de Inteligência Artificial e Machine Learning.
                        </p>
                    </div>

                    <div className = {styles.sidebarContact}>
                        <h2 className={styles.subtitle}>
                            Contatos
                        </h2>

                        <div className = {styles.contactRow}>
                            <img src="/icons/linkedin.png" height="25px"/>
                            <a href = "https://www.linkedin.com/in/felippechemello/" className = {styles.contact}> Felippe Jaqson Chemello </a>
                        </div>

                        <div className = {styles.contactRow}>
                            <img src="/icons/github.png" height="25px"/>
                            <a href = "https://github.com/FelippeChemello" className = {styles.contact}> FelippeChemello </a>
                        </div>
                    </div>

                    <div className = {styles.sidebarSkills}>
                        <h2 className={styles.subtitle}>
                            Skills 
                        </h2>

                        <div className = {styles.contactRow}>
                            <img src="/icons/linkedin.png" height="25px"/>
                            <a href = "https://www.linkedin.com/in/felippechemello/" className = {styles.contact}> Felippe Jaqson Chemello </a>
                        </div>

                        <div className = {styles.contactRow}>
                            <img src="/icons/github.png" height="25px"/>
                            <a href = "https://github.com/FelippeChemello" className = {styles.contact}> FelippeChemello </a>
                        </div>
                    </div>
                </div>

                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Welcome to <a href="https://nextjs.org">Next.js!</a>
                    </h1>

                    <p className={styles.description}>
                        Get started by editing{' '}
                        <code className={styles.code}>pages/index.js</code>
                    </p>

                    <div className={styles.grid}>
                        <a href="https://nextjs.org/docs" className={styles.card}>
                        <h3>Documentation &rarr;</h3>
                        <p>Find in-depth information about Next.js features and API.</p>
                        </a>

                        <a href="https://nextjs.org/learn" className={styles.card}>
                        <h3>Learn &rarr;</h3>
                        <p>Learn about Next.js in an interactive course with quizzes!</p>
                        </a>

                        <a
                        href="https://github.com/vercel/next.js/tree/master/examples"
                        className={styles.card}
                        >
                        <h3>Examples &rarr;</h3>
                        <p>Discover and deploy boilerplate example Next.js projects.</p>
                        </a>

                        <a
                        href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}
                        >
                        <h3>Deploy &rarr;</h3>
                        <p>
                            Instantly deploy your Next.js site to a public URL with Vercel.
                        </p>
                        </a>
                    </div>
                </main>

                <footer className={styles.footer}>
                    <a
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Powered by{' '}
                        <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
                    </a>
                </footer>
            </div>
        </>
    )
}
