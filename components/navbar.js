import React, {useState, useEffect}  from 'react';

import styles from '../styles/Navbar.module.css';

function Navbar() {
    const [navItemsState, setNavItemsState] = useState({
        artigos: true,
        projetos: false,
        sobre: false
    })

    function handleNavigation(navItemClicked) {
        const currentItemsState = navItemsState
        Object
            .keys(currentItemsState)
            .forEach(item => currentItemsState[item] = (item === navItemClicked) ? true : false)

        setNavItemsState({...currentItemsState})
    }

    return (
        <div className={styles.navbar}>
            <button className={navItemsState.artigos ? styles.navItemActive : styles.navItem} onClick={() => handleNavigation("artigos")}> Artigos </button>
            <button className={navItemsState.projetos ? styles.navItemActive : styles.navItem} onClick={() => handleNavigation("projetos")}> Projetos </button>
            <button className={navItemsState.sobre ? styles.navItemActive : styles.navItem} onClick={() => handleNavigation("sobre")}> Sobre </button>
        </div>
    )
}

export default Navbar;