import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';


const GithubContext = React.createContext();

// with provider we have access to both provider and consumer
// Provider ->one who is providing the props
// Consumer -> one who is consuming it
// Provider ,consumer - GithubContext.Provider


// passing in the value to the children
// here the children is the whole app see index.js  
const GithubProvider = ({children}) =>{
const[githubUser,setGithubUser] = useState(mockUser)
const[repos,setRepos] = useState(mockRepos)
const[followers,setFollowers] = useState(mockFollowers)

// inside value we are providing an object with properties and respective 
// values
// we are using es6 syntax that when properties and value name are same
// we dont rewrite it
// actually it is this {githubUser:githubUser,repos:repos,followers:followers}
    return (<GithubContext.Provider value={{githubUser,repos,followers}}>{children}</GithubContext.Provider>)
}

export {GithubProvider,GithubContext}