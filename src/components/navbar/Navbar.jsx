import React from 'react';
import Links from "./../../components/navbar/links/Links";
import styles from './navbar.module.css'
import Link from "next/link";
import {auth} from "../../lib/auth";

async function Navbar() {

    //session means isAuthenticated
    const session = await auth();

    return (
        <div className={styles.container}>
            <Link
                href='/'
                className={styles.logo}>
                Logo
            </Link>
            <div>
                <Links
                    session={session}/>
            </div>
        </div>
    );
}

export default Navbar;