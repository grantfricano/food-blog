import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Comment from './Comment';

function Blog() {

    let { id, title } = useParams();

    return (
        <>
        <h1>{title}</h1>
        <Comment blogId={id} />
      </>
    )
}

export default Blog;