import React, { useState, useEffect } from 'react';
import axios from 'axios'
const marked = require('marked')

import styles from '../styles/Catalog.module.css'

function PortfolioItem({ type }) {
    const [isMinimized, setIsMinimized] = useState(true)
    const [items, setItems] = useState([])

    const charQuantityWhenMinimized = 500;

    useEffect(() => {
        axios.get("/api/catalog").then(response => setItems(response.data))
    }, [])

    function getDescription(item) {
        if (isMinimized) {
            let charCount = 0;
            
            item.content.split(' ').forEach(word => {
                if (charCount < charQuantityWhenMinimized) {
                    charCount += word.length
                }
            })

            return marked(`${item.content.substring(0, charCount + 2)}...`)            
        } else {
            return marked(item.content)
        }
    }

    function handleReadMore() {
        setIsMinimized(!isMinimized)
    }

    return (
        <>
            { items.map(item => { console.log(item); if (item.type === type.replace(/s$/, '')) return(
                <div key={item.name} className={styles.container}>
                    <div className={styles.itemHeader}>
                        <div className={styles.icon}>
                            <img src={`${item.type}.png`} height={38}/>
                        </div>
                        <div className={styles.title} >
                            {item.name}
                        </div>
                    </div>

                    <div className={styles.description}>
                        <div className={styles.textDescription} dangerouslySetInnerHTML={{__html: getDescription(item)}}></div>

                        <button className={styles.buttonContinueReading} onClick={handleReadMore}>CONTINUAR LENDO</button>
                    </div>

                    <div className={styles.image}>
                        <img src={item.imagesource} />
                    </div>

                    <div className = {styles.badges}>
                        {Object.entries(item.badges).map(([badgeKey, badgeValue]) => {
                            if (badgeValue.href) {
                                return (
                                    <a target="_blank" href={badgeValue.href}>
                                        <img src={`${badgeValue.imgSrc}`} className={styles.badge}/>
                                    </a>
                                )
                            } else {
                                return <img src={`${badgeValue.imgSrc}`} className={styles.badge}/>
                            }
                        })}
                    </div>
                </div>
            )})}
        </>
    )
}

export default PortfolioItem;