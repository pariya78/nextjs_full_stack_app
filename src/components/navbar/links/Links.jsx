"use client"
import React, {useState} from 'react';
import styles from './links.module.css'
import NavLink from "./../../../components/navbar/links/navLink/navLink";
import Image from "next/image";

const links = [
    {
        title: 'HomePage',
        path: '/'
    },
    {
        title: 'About',
        path: '/about'
    },
    {
        title: 'Contact',
        path: '/contact'
    },
    {
        title: 'Blog',
        path: '/blog'
    }
]

function Links() {

    const [open, setOpen] = useState(false);

    //session means isAuthenticated
    const session = true;
    const isAdmin = true;

    return (
        <div>
            <div className={styles.links}>
                {links.map((link) => <NavLink
                    key={link.title}
                    item={link}/>)}{
                session ? (
                    <>
                        {
                            isAdmin &&
                            <NavLink item={{title: "Admin", path: "/admin"}}/>
                        }
                        <button className={styles.logout}>Logout</button>
                    </>
                ) : (
                    <NavLink item={{title: "Login", path: "/login"}}/>
                )
            }
            </div>
            <Image
                className={styles.menuButton}
                src='/menu.png'
                width={30}
                height={30}
                alt=''
                onClick={() => setOpen((prevState) => !prevState)}/>
            {
                open && <div className={styles.mobileLinks}>
                    {links.map((link) => (
                        <NavLink item={link}
                                 key={link.title}/>
                    ))}
                </div>
            }
        </div>
    );
}

export default Links;