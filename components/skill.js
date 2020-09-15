import React, { useState, useEffect } from 'react';
import axios from 'axios'

import styles from '../styles/Skill.module.css';

function Skill({ language, percent }) {
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        axios.get('/api/wakatime').then(response => {
            const languagesNotProcessed = response.data.languages
        
            setLanguages(languagesNotProcessed.filter(
                language => {
                    if (language.percent > 5) return language.name
                }
            ).map(language => language.name))
        })
    }, [])

    return (
        <div className = {styles.sidebarSkills}>
            <h2 className={styles.subtitle}>
                    Skills
            </h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', maxHeight: "120px", overflow: 'hidden' }}>
                {languages.map(language => (
                    <img 
                        style={{
                            height: "40px",
                            margin: "10px"
                        }}
                        key={language} 
                        src={`https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/${language.toLowerCase()}/${language.toLowerCase()}.png`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Skill;
