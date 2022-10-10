import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import styles from '../styles/Blog.module.css'
import * as fs from 'fs';
import InfiniteScroll from 'react-infinite-scroll-component';

const Blog = (props) => {
    const [blogs, setBlogs] = useState(props.allBlogs);
    const [count, setcount] = useState(2)

    const fetchData = async () => {
        let d = await fetch(`http://localhost:3000/api/blogs/?count=${count + 2}`)
        setcount(count + 2)
        let data = await d.json()
        setBlogs(data);
    };

    return <div className={styles.container}>
        <main className={styles.main}>

            <InfiniteScroll
                dataLength={blogs.length} //This is important field to render the next data
                next={fetchData}
                hasMore={props.allCount !== blogs.length}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <h3 className={styles.h3}>
                        Yay! You have seen it all
                    </h3>
                }
            >
                {blogs.map((blogitem) => {
                    return <div key={blogitem.slug} >
                        <Link href={`/blogspost/${blogitem.slug}`}>
                            <h3 className={styles.blogItemh3}>
                                {blogitem.title}
                            </h3></Link>
                        <p className={styles.blogitemp}>
                            {blogitem.metadsc}.....
                        </p>
                        <Link href={`/blogspost/${blogitem.slug}`}>
                            <button className={styles.btn}>Read More</button>
                        </Link>
                    </div>
                })}
            </InfiniteScroll>
        </main >
    </div >
}

// This gets called on every request
export async function getStaticProps(context) {
    let data = await fs.promises.readdir('blogdata');
    let allCount = data.length;
    let myfile;
    let allBlogs = [];

    //Iterating Through Each Data Item
    for (let index = 0; index < 2; index++) {
        const item = data[index];
        // console.log(item)
        //Storing File Contents in allBlogs Array
        myfile = await fs.promises.readFile(('blogdata/' + item), 'utf-8')
        allBlogs.push(JSON.parse(myfile))
    }
    
    // Pass data to the page via props
    return {
        props: { allBlogs, allCount},
    }
}

export default Blog