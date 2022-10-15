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
       <div>
            <h2>BlogPosts!</h2>
            <h3>Welcome to my blog posts page!</h3>
            <div>
                {allPostsData &&
                    allPostsData.map((post, index) => (
                        <Link to={'/' + post.slug.current} key={post.slug.current}>
                            <span key={index}>
                                <img className='main-image' src={post.mainImage.asset.url} />
                                <span><h2>{post.title}</h2></span>
                            </span>
                        </Link>
                    ))}
            </div>
       </div>
    )
}