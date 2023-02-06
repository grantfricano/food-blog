import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import sanityClient from '../../client.js';
import imageUrlBuilder from  '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import Comment from '../Comment/Comment.js';
import './OnePost.css';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
    return builder.image(source);
}

export default function OnePost() {

    const [postData, setPostData] = useState(null);
    const { slug } = useParams();
 
    useEffect(() =>{
        sanityClient.fetch(
            `*[slug.current == $slug]{
                title, 
                slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    }
                },
                body,
                "name": author->name,
                "authorImage": author->image
            }`,
            { slug }
        )
        .then((data) => setPostData(data[0]))
        .catch(console.error);
    }, {slug})

    
const styles = {
    color: "red",
    background: "#0f0",
    fontSize: "32px"
};

    if (!postData) return <div>Loading...</div>;

    return (
        <div className='one-post-container '>
            <div className='title-card'>
                
                <img className='main-image-banner' src={urlFor(postData.mainImage).url()} />
                <h2 className='one-post-title font-face-simplifica'>{postData.title}</h2>
            </div>
            <div className='content-body '>
                <BlockContent
                    blocks={postData.body}
                    projectId={sanityClient.clientConfig.projectId}
                    dataset={sanityClient.clientConfig.dataset}
                />
            </div>
            <Comment blogId={slug} />
        </div>
    )
}