import React, { useEffect, useState} from 'react';
import sanityClient from  '../../client';
import { Link } from 'react-router-dom';
import './AllPosts.css';

export default function AllPosts() {
    let [allPostsData, setAllPosts] = useState(null);

    useEffect( () => {
        sanityClient.fetch (
            `*[_type == "post"] | order(_createdAt desc) {
                title, 
                slug,
                _createdAt,
                previewText,
                mainImage{
                    asset-> {
                        _id, 
                        url
                    }
                },
                "name": author->name,
                "authorImage": author->image    
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
                            <div className='entry' key={index}>
                                <img className='thumbnail-image' src={post.mainImage.asset.url} />
                                <div className='post-title'><h5 className='font-face-simplifica'>{post.title}</h5>  <div className='post-timestamp'>{
                                     String(post._createdAt).split("T")[0] 
                                }</div>
                                <div><p>{post.previewText}</p></div>
                            </div> 
                            </div>
                            <br />
                        </Link>
                    ))}
            </div>
       </div>
    )
}