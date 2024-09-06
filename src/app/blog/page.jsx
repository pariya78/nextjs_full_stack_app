import React from 'react';
import PostCard from "./../../components/postCard/PostCard";
import styles from './blog.module.css'

//fetch data with an api
const getData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts",
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
    console.log('params are : ' + JSON.stringify(searchParams))

    const posts = await getData();

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