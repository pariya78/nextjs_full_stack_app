import React from 'react';
import styles from './singlePost.module.css'
import Image from "next/image";
import PostUser from "./../../../components/postUser/PostUser";


//fetch data with an api
const getData = async (slug) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`,
        //it will fetch data every time we return to this page from another page. and data is fully refreshed
        // {cache:"no-store"}
        //it will reFetch your data every 3600 seconds (1 hour)
        {next: {revalidate: 3600}}
    );


    if (!res.ok) {
        throw new Error("Something went wrong");
    }
    return res.json();
}

const SinglePostPage = async ({params}) => {
    console.log(JSON.stringify(params))

    const {slug} = params;
    const post = await getData(slug);

    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image
                    className={styles.img}
                    src='/post.jpg'
                    alt='post'
                    fill/>
            </div>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>{post.title}</h1>
                <div className={styles.detail}>
                    <Image
                        src='/post.jpg'
                        alt='post'
                        width={50}
                        height={50}
                        className={styles.avatar}/>
                    <PostUser userId={post.userId}/>
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>01.01.2024</span>
                    </div>
                </div>
                <div className={styles.content}>
                    {post.body}
                </div>
            </div>
        </div>
    );
};

export default SinglePostPage;