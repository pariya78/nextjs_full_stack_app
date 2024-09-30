import {Inter} from 'next/font/google';
import './globals.css';
import Navbar from "./../components/navbar/Navbar";
import Footer from "./../components/footer/Footer";

//YouTube video for this tutorial link: https://www.youtube.com/watch?v=vCOSTG10Y4o&t=12624s

const inter = Inter({subsets: ['latin']});

//it is important for SEO
export const metadata = {
    title: {
        default: 'Next.js 14 Homepage',
        //instead of this < %s > , we can use different titles but < | Next.js 14 > will be common and no need to repeat in different pages
        template: '%s | Next.js 14'
    },
    description: 'Next.js starter app description',
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <div className='container'>
            <Navbar/>
            {/*this represents all pages*/}
            {children}
            <Footer/>
        </div>
        </body>
        </html>
    )
}