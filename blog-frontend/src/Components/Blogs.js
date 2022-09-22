import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Blogs() {
    
    let [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4100/blogs/')
        .then((response) => response.json())
        .then((data) => {setBlogs(data)});

    },[]);

    return (
        <table border='1'>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Body</th>
          <th>ID</th>
        </tr>


        {
          blogs.map((blog) => ( 
            <tr>
              <td><Link to={{
                    pathname: `/blog/${blog._id}`,
                    state: { blog }
                }}>{blog.title}</Link></td>
              <td>{blog.author}</td>
              <td>{blog.body}</td>
              <td>{blog._id}</td>
            </tr>
          ))
        }
      </table>
       
    )
}

export default Blogs;