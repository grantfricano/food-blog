import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Blogs() {
    
    let [blogs, setBlogs] = useState([]);
    
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/blogs/')
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
                    pathname: `/blog/${blog._id}/${blog.title}`,
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