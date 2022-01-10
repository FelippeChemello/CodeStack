import * as React from 'react'
import { AiOutlineToTop } from 'react-icons/ai'
import { IoSunnyOutline, IoMoonSharp } from 'react-icons/io5'
import * as config from 'lib/config'

import styles from './styles.module.css'

// TODO: merge the data and icons from PageSocial with the social links in Footer

export const Footer: React.FC<{
    isDarkMode: boolean
    toggleDarkMode: () => void
}> = ({ isDarkMode, toggleDarkMode }) => {
    const [hasMounted, setHasMounted] = React.useState(false)
    const toggleDarkModeCb = React.useCallback(
        (e) => {
            e.preventDefault()
            toggleDarkMode()
        },
        [toggleDarkMode]
    )

    const goToTop = React.useCallback((e) => {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    React.useEffect(() => {
        setHasMounted(true)
    }, [])

    return (
        <footer className={styles.footer}>
            <div className={styles.copyright}>
                Copyright 2021 {config.author}
            </div>

            <div
                className={styles.settings}
                style={{ justifyContent: 'center' }}
            >
                <a
                    className={styles.toggleDarkMode}
                    onClick={goToTop}
                    title='Go to top'
                >
                    <AiOutlineToTop />
                </a>
            </div>

            {hasMounted ? (
                <div className={styles.settings}>
                    <a
                        className={styles.toggleDarkMode}
                        onClick={toggleDarkModeCb}
                        title='Toggle dark mode'
                    >
                        {isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
                    </a>
                </div>
            ) : null}
        </footer>
    )
}
