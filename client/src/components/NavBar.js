import React from 'react';
import DisplayPosts from '../components/DisplayPosts';
import EditPost from '../components/EditPost';
import DeletePost from '../components/DeletePost';
import CreatePost from '../components/CreatePost';

import { BrowserRouter as Router,Route, Switch, Link } from "react-router-dom";

export default function NavBar(){
  

return (
        <Router>
            <div>
                <Link to="/">Add Post</Link>
                <Link to="/get">Get Posts</Link>
                <Link to="/edit">Edit Posts</Link>
                <Link to="/delete">Delete Post</Link>
            </div>

            <Switch>
                <Route exact path="/" component={CreatePost}/>
                <Route  path="/get" component={DisplayPosts}/>
                <Route  path="/edit" component={EditPost}/>
                <Route  path="/delete" component={DeletePost}/>

            </Switch>
        </Router>
  );
}

