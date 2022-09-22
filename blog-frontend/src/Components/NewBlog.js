import React, { useState, useEffect} from 'react';


function NewBlog() {
    let [blogTitle, setBlogTitle] = useState('');
    let [blogAuthor, setBlogAuthor] = useState('');
    let [blogBody, setBlogBody] = useState('');
    let [data, setBlog] = useState('');

    function SubmitBlog(){
        const newBlog = {
            title: blogTitle,
            author: blogAuthor,
            body: blogBody
          }
          fetch('http://localhost:4100/blogs/', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(newBlog)
          })
            .then((response) => response.json())
            .then((data) => {setBlog(data)})
            
    }

    return (
        <div>
            <label>Title</label>
            <input type="text" placeholder='Title' onChange={(event) => setBlogTitle(event.target.value)}></input>
            <br/>
            <label>Author</label>
            <input type="text" placeholder="Author"  onChange={(event) => setBlogAuthor(event.target.value)}></input>
            <br/>
            <label>Enter Body</label>
            <input type="text" placeholder="New Blog" onChange={(event) => setBlogBody(event.target.value)}></input>
            <br />
            <br />
            <button type="submit" value="Submit" onClick={SubmitBlog}>Post</button>
        </div>
    )

}

export default NewBlog;