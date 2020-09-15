import React, {useState, useEffect} from 'react'
import TrackVisibility from 'react-on-screen'
import Head from 'next/head'

import styles from '../styles/Home.module.css'

import Skill from '../components/skill'
import Bio from '../components/bio'
import Contact from '../components/contact'

export default function Home() {
    let isContactVisible = false;

    return (
        <>
            <Head>
                <title>Felippe Jaqson Chemello</title>
                <link rel="icon" href="/profile.jpg" />
            </Head>

            <div className={styles.container}>
                <div className = {styles.sidebar}>
                    <Bio />

                    <TrackVisibility once>
                        {({ isVisible }) => { 
                            if (isVisible) {
                                isContactVisible = true
                                return <Contact />
                            } else {
                                isContactVisible = false;
                            }
                        }}
                        
                    </TrackVisibility>

                    <TrackVisibility once>
                        {({ isVisible }) => (isVisible && isContactVisible) ? 
                        <Skill /> 
                        : <> </> }
                    </TrackVisibility>
                </div>

                <main className={styles.main}>
                    
                </main>
            </div>
        </>
    )
}
