import React, {useState} from 'react'
import Head from 'next/head'

import styles from '../styles/Home.module.css'

import Skill from '../components/skill'
import Bio from '../components/bio'
import Contact from '../components/contact'
import Navbar from '../components/navbar'
import Catalog from '../components/catalog'

export default function Home() {
    const [navItemsState, setNavItemsState] = useState({
        projects: true,
        articles: false,
        about: false
    })

    function getKeyNameWhereTrueValue(json) {
        for (let key in json) {
            if (json[key] === true) {
                console.log(key)
                return key;
            }
        }
    }

    return (
        <>
            <Head>
                <title>Felippe Jaqson Chemello</title>
                <link rel="icon" href="/icons/codestack.png" />
            </Head>
            
            <div className={styles.background}>
                <Navbar navItemsState={navItemsState} setNavItemsState={setNavItemsState}/>

                <div className={styles.container}>
                    <div className = {styles.sidebar}>
                        <Bio />
                            
                        <Contact />

                        <Skill /> 
                    </div>

                    <main className={styles.main}>
                        {navItemsState.articles || navItemsState.projects ? <Catalog type={getKeyNameWhereTrueValue(navItemsState)}/> : <> </>}
                    </main>
                </div>
            </div>
        </>
    )
}
