import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Blog() {
    let { id } = useParams();
    let [comments, setComments] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4100/blogs/comments/' + id)
        .then((response) => response.json())
        .then((data) => {setComments(data)});

    },[]);

    return (
        <>
        <h1>{id}</h1>
        <table border='1'>
        <tr>
          <th>Author</th>
          <th>Comment</th>
        </tr>
        {
          comments.map((comment) => ( 
            <tr>
              <td>{comment.author}</td>
              <td>{comment.content}</td>
            </tr>
          ))
        }
      </table>
      </>
    )
}

export default Blog;