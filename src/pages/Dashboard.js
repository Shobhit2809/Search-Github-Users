import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
import { useContext } from 'react';
const Dashboard = () => {
   const{isLoading} = React.useContext(GithubContext)

  //  when isLoading is true
   if(isLoading){
return(
  <main>
    <Navbar/>
    <Search/>
    <img src={loadingImage} classname = 'loading-img'></img>
  </main>
)
     }
  return (
   
    <main>
      <Navbar/>
      <Search/>
      <Info/>
      <User/>
      <Repos/>
    </main>
  );
};

export default Dashboard;
