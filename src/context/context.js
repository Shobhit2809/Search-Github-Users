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

// request loading
const[requests,setRequests] = useState(0)
const[isLoading,setIsLoading] = useState(false);

// error
// default value is an object
const[error,setError] = useState({show:false,msg:""})


// 
const searchGithubUser = async(user)=>{
    // console.log(user);
    // toggleError has bydefault show = false 
    // since we are using async await we need use it before

        // to clear previous error and set it to default values
    toggleError()
    setIsLoading(true)

    // axios is by default a get request
    // see roorUrl and getUser url in readme
    const response = await axios(`${rootUrl}/users/${user}`).catch((err)=>{
        console.log(err);
    })
console.log(response);
if(response){
    setGithubUser(response.data)
    const{login,followers_url} = response.data
    // repos
    axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response)=>{setRepos(response.data)})
    // followers
        axios(`${followers_url}?per_page=100`).then((response)=>{setFollowers(response.data)})

    // more logic here  
    // repos
// https://api.github.com/users/john-smilga/repos?per_page=100
    // followers
    // https://api.github.com/users/john-smilga/followers
    
}
else{
    toggleError(true,'there is no user with that username')
}
checkRequests()
setIsLoading(false)
}


// check rate
// axios return a promise
const checkRequests = ()=>{
    // axios is default a get request
    // data is response
    // destructuring data {data}
    // go to readme and copy paste the ur; in browser 
    axios.get(`${rootUrl}/rate_limit`).then(({data})=>{
        // rate is a property and we are destructuring remaining into it from data
let {rate:{remaining}}=data;    
setRequests(remaining)
// remaining=0;
if(remaining===0){
    // throw an error
    toggleError(true,'Sorry,you have exceeded your hourly search limit!')
}
    }).catch((err)=>console.log(err))
}
// destructuring and setting some default values 
function toggleError(show=false,msg=''){
    setError({show,msg})
}
// error
useEffect(checkRequests,[])

// inside value we are providing an object with properties and respective 
// values
// we are using es6 syntax that when properties and value name are same
// we dont rewrite it
// actually it is this {githubUser:githubUser,repos:repos,followers:followers}
    return (<GithubContext.Provider value={{githubUser,repos,followers,requests,error,searchGithubUser,isLoading}}>{children}</GithubContext.Provider>)
}

export {GithubProvider,GithubContext}