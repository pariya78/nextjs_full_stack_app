import React from 'react';
import Link from "next/link";

function NotFound(props) {
    return (
        <>
            <div>Not found!!!</div>
            <Link href='/'>return home</Link>
        </>
    );
}

export default NotFound;