import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';

function Blog() {

    let { id } = useParams();
    let [comments, setComments] = useState([]);

    let [content, setContent] = useState('');
    const {token, user} = useContext(UserContext);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/blogs/comments/' + id)
        .then((response) => response.json())
        .then((data) => {setComments(data)});

    },[comments]);

    function submitComment() {

        const comment = {
            author: user,
            content: content,
            blog: id
        }
          fetch(process.env.REACT_APP_API_URL + '/blogs/comments/', {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'Authorization': token},
            body: JSON.stringify(comment)
          })
            .then((response) => response.json())
            .then((data) => {setComments(data)});
    }

    function deleteComment(commentId) {
      fetch(process.env.REACT_APP_API_URL + '/blogs/comments/' + commentId, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json', 'Authorization': token},
        body: JSON.stringify()
      })
    }

    return (
        <>
        <h1>{id}</h1>

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
            <tr id={comment._id}>
              <td>{comment.author}</td>
              <td>{comment.content}</td>
              {user == comment.author ? <button type="submit" onClick={() => deleteComment(comment._id)}>Delete</button> : ''}
            </tr>
          ))
        }
      </table>
      </>
    )
}

export default Blog;