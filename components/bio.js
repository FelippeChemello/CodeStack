import React from 'react';

import styles from '../styles/Bio.module.css'

function Bio() {
    return (
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
    )
}

export default Bio;