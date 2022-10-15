import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import sanityClient from '../../client.js';
import imageUrlBuilder from  '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import Comment from '../Comment.js';

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

    if (!postData) return <div>Loading...</div>;

    return (
        <div>
            <div>
                <h2>{postData.title}</h2>
                <div>
                    <img src={urlFor(postData.authorImage).width(100).url()} alt='Author is me' />
                    <h4>{postData.name}</h4>
                </div>
            </div>
            <img src={urlFor(postData.mainImage).width(200).url()} />
            <div>
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