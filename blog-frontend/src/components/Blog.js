import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Comment from './Comment';

function Blog() {

    let { id } = useParams();

    return (
        <>
        <h1>{id}</h1>
        <Comment blogId={id} />
      </>
    )
}

export default Blog;