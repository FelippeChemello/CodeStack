import React, {useState, useEffect}  from 'react';

import styles from '../styles/Navbar.module.css';

function Navbar({navItemsState, setNavItemsState, position}) {

    function handleNavigation(navItemClicked) {
        const currentItemsState = navItemsState
        Object
            .keys(currentItemsState)
            .forEach(item => currentItemsState[item] = (item === navItemClicked) ? true : false)

        setNavItemsState({...currentItemsState})
    }

    return (
        <>
            <hr className={styles[position]}/>

            <div className={styles[`navbar${position}`]}>
                <div className={styles.navArea}>
                    <button className={navItemsState.projects ? styles.navItemActive : styles.navItem} onClick={() => handleNavigation("projects")}> Projetos </button>
                    <button className={navItemsState.articles ? styles.navItemActive : styles.navItem} onClick={() => handleNavigation("articles")}> Artigos </button>
                    <button className={navItemsState.about ? styles.navItemActive : styles.navItem} onClick={() => handleNavigation("about")}> Sobre </button>
                </div>
            </div>
        </>
    )
}

export default Navbar;