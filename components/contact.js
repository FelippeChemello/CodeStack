import React from 'react';

import styles from '../styles/Contact.module.css'

function Contact() {
    return (
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
    )
}

export default Contact;