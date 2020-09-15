import React from 'react'
import Head from 'next/head'

import styles from '../styles/Home.module.css'

import Skill from '../components/skill'
import Bio from '../components/bio'
import Contact from '../components/contact'
import Navbar from '../components/navbar'
import Catalog from '../components/catalog'

export default function Home() {
    return (
        <>
            <Head>
                <title>Felippe Jaqson Chemello</title>
                <link rel="icon" href="/profile.jpg" />
            </Head>

            <Navbar />

            <div className={styles.container}>
                <div className = {styles.sidebar}>
                    <Bio />
                        
                    <Contact />

                    <Skill /> 
                </div>

                <main className={styles.main}>
                    <Catalog />
                </main>
            </div>
        </>
    )
}
