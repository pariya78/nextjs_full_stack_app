import React from 'react';
import PostCard from "./../../components/postCard/PostCard";
import styles from './blog.module.css'
import {getPosts} from "./../../lib/data";

//fetch data with an api
const getData = async () => {
    //it fetches data from next server ( api route file : /api/blog ) -> BACKEND E KHODEMOON
    const res = await fetch("http://localhost:3000/api/blog",
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

async function BlogPage({params, searchParams}) {

    //FETCH DATA WITHOUT AN API
    const posts = await getData();

    //FETCH DATA WITHOUT AN API
    // const posts = await getPosts();

    return (
        <div className={styles.container}>
            {posts.map((post) => (
                    <div
                        className={styles.post}
                        key={post.id}>
                        <PostCard
                            post={post}/>
                    </div>
                )
            )}
        </div>
    );
}

export default BlogPage;