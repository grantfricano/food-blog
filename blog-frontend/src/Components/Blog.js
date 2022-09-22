import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Blog() {

    let { id } = useParams();
    let [comments, setComments] = useState([]);
    let [author, setAuthor] = useState('');
    let [content, setContent] = useState('');

    useEffect(() => {
        fetch('http://localhost:4100/blogs/comments/' + id)
        .then((response) => response.json())
        .then((data) => {setComments(data)});

    },[]);

    function submitComment() {

        const comment = {
            author: author,
            content: content,
            blog: id
          }
      
          fetch('http://localhost:4100/blogs/comments/', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(comment)
          })
            .then((response) => response.json())
            .then((data) => {setComments(data)});
    }

    return (
        <>
        <h1>{id}</h1>

        <input type="text" id="author" placeholder="Author Name" onChange={(event) => setAuthor(event.target.value)}/>
        <br />
        <input type="text" id="newComment" placeholder="Comment" onChange={(event) => setContent(event.target.value)} />
        <br />
        <button type="submit" onClick={submitComment}>Save</button>
        <br /><br /><br />
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