import React from 'react';
import styles from './footer.module.css'

function Footer(props) {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                lamadev
            </div>
            <div className={styles.text}>
                Lama creative thoughts All right reserved.
            </div>
        </div>
    );
}

export default Footer;