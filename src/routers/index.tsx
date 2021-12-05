import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostLists from "./../pages/posts/postList";
import PostForm from "./../pages/posts/_form";


const Routers = () => {
    return (
        <Router>
            <Routes>
            <Route path="/about" element={<About/>}>
          
          </Route>
          <Route path="/add" element={<PostForm/>}>
          
          </Route>
          <Route path="/" element={<PostLists/>}>
          
          </Route>
            </Routes>
        </Router>
    )
}
function Home() {
    return <h2>Home</h2>;
  }
  
  function About() {
    return <h2>About</h2>;
  }
  
  function Users() {
    return <h2>Users</h2>;
  }

export default Routers;