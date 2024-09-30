import React from 'react';
import styles from './singlePost.module.css'
import Image from "next/image";
import PostUser from "./../../../components/postUser/PostUser";
import {Suspense} from "react";
import {getPost} from "../../../lib/data";

//a blog title will be the meta data title, so when user searches title of article, Google will show this
export const generateMetadata = async ({params}) => {
    const {slug} = params;
    const post = await getPost(slug);

    return {
        title: post.title,
        description: post.desc
    }
}

//fetch data with an api
const getData = async (slug) => {
    const res = await fetch(`http://localhost:3000/api/blog/${slug}`,
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
    const {slug} = params;

    //fetch data without an api
    // const post = await getPost(slug);

    //fetch data with an api
    const post = await getData(slug);

    return (
        <div className={styles.container}>
            {post?.img &&
                <div className={styles.imgContainer}>
                    <Image
                        className={styles.img}
                        src={post.img}
                        alt='post'
                        fill/>
                </div>}
            <div className={styles.textContainer}>
                <h1 className={styles.title}>{post?.title}</h1>
                <div className={styles.detail}>
                    {post &&
                        <Suspense fallback={<div>Loading...</div>}>
                            <PostUser userId={post?.userId}/>
                        </Suspense>
                    }
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>{post?.createdAt.toString().slice(4, 16)}</span>
                    </div>
                </div>
                <div className={styles.content}>
                    {post?.desc}
                </div>
            </div>
        </div>
    );
};

export default SinglePostPage;