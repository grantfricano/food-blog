import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../../contexts/UserContext';
import './Comment.css';

function Comment( {blogId} ) {

    let [comments, setComments] = useState([]);
    let [response, setResponse] = useState('');

    let [content, setContent] = useState('');
    const {token, user} = useContext(UserContext);


    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/blogs/comments/' + blogId)
        .then((response) => response.json())
        .then((data) => {setComments(data)})
    },[response]);

    function submitComment() {

        const comment = {
            author: user,
            content: content,
            blog: blogId
        }

        document.getElementById("newComment").value = "";

        fetch(process.env.REACT_APP_API_URL + '/blogs/comments/', {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'Authorization': token},
          body: JSON.stringify(comment)
        })
          .then((response) => response.json())
          .then((data) => {setResponse(data)});
    }

    function deleteComment(commentId) {
      
      fetch(process.env.REACT_APP_API_URL + '/blogs/comments/' + commentId, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json', 'Authorization': token},
        body: JSON.stringify()
      })
      .then((response) => response.json())
      .then((data) => {setResponse(data)});

    }

    return (
        <>
        <div className='comment-box'>
        {token ? <h2 className='comment-header font-face-simplifica'>comments</h2> : <h2 className='comment-header font-face-simplifica'>login to comment</h2>}
        <br />
        {token ? <textarea rows='5' type="text" className='comment-entry' id="newComment" placeholder="Comment..." onChange={(event) => setContent(event.target.value)} /> : ''}
        <br />
        {token ? <button className='comment-submit-button ' type="submit" onClick={submitComment}><b>submit</b> </button> : ''}
        <br /><br />

        <table className='comment-table' border='1'>
        {/* <tr>
          <th>Author</th>
          <th>Comment</th>
        </tr> */}
        {
          comments.map((comment) => ( 
              <tr id={comment._id}>
                  <div><b>{comment.author}</b> on   <i>{String(comment.createdAt).split("T")[0]} </i></div>
                  <div>{comment.content}</div>
                {user == comment.author ? <button className='comment-delete-button' type="submit" onClick={() => deleteComment(comment._id)}><b>delete</b></button> : ''}   
                <br /> <br />
              </tr>

          ))
        }
      </table>
      </div>
      </>
    )
}

export default Comment;