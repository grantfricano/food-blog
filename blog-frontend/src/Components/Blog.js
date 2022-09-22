import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Blog() {
    let { id } = useParams();

    return (
        <div>Hello World {id}</div>
    )
}

export default Blog;