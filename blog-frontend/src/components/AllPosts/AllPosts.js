import React, { useEffect, useState} from 'react';
import sanityClient from  '../../client';
import { Link } from 'react-router-dom';
import './AllPosts.css';

export default function AllPosts() {
    let [allPostsData, setAllPosts] = useState(null);

    useEffect( () => {
        sanityClient.fetch (
            `*[_type == "post"]{
                title, 
                slug,
                mainImage{
                    asset-> {
                        _id, 
                        url
                    }
                }
            }`
        )
        .then((data) => {setAllPosts(data)})
        .catch(console.error);
    }, [])

    return (
       <div className='posts-box'>
            {/* <div className='blog-title'>
                <h2>BlogPosts!</h2>
                <h3>Welcome to my blog posts page!</h3>
            </div> */}
            <div className='links'>
                {allPostsData &&
                    allPostsData.map((post, index) => (
                        <Link to={'/' + post.slug.current} key={post.slug.current}>
                            <div key={index}>
                                <span className='post-title'><h2>{post.title}</h2></span>
                                <img className='main-image' src={post.mainImage.asset.url} />
                            </div>
                        </Link>
                    ))}
            </div>
       </div>
    )
}