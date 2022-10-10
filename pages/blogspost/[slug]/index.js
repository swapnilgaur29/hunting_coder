import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import styles from '../../../styles/BlogPost.module.css'
import * as fs from 'fs';


const Slug = (props) => {
    function createMarkup(c) {
        return { __html: c };
    }
    const [blog, setBlog] = useState(props.myBlog)
    // const router = useRouter();

    return <div className={styles.container}>
        <main className={styles.main}>
            <h1 className={styles.h1}>{blog && blog.title}</h1>
            <hr />
            <div className={styles.des}>
                {blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>}
            </div>
        </main>
    </div>
}

//Use to Get The path of all blogs
export async function getStaticPaths() {
    let allb = await fs.promises.readdir('blogdata/')
    allb=allb.map((item)=>{
        return {params : {slug:item.split(".")[0]}}
    })
    return {
        paths: allb,
        fallback: false, // can also be true or 'blocking'
    }
}

// This gets called on every request
export async function getStaticProps(context) {
    // Fetch data from external API
    const { slug } = context.params
    let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, 'utf-8')
    // Pass data to the page via props
    return {
        props: { myBlog: JSON.parse(myBlog) },
    }
}


export default Slug