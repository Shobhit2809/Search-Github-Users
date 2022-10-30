import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const{repos} = React.useContext(GithubContext);

  // reduce(callback function,what u are trying to return)
const languages = repos.reduce((total,item)=>{
  // we destructure language and stargazers_count from each and every repo since each repo is an object 
const{language,stargazers_count} = item;
// if language is null return total 
if(!language) return total;
if(!total[language]){
  total[language] = {label:language,value:1,stars:stargazers_count};
}
else{
  // copy all the properties of object (i.e label ,value and stars) to this object and then overwrite
  // the value property and stars property
  total[language] ={...total[language],value:total[language].value+1,
  stars:total[language].stars+stargazers_count,
  };
}
return total;
},{})
// turning language object into array
// sort based on the values so that language with highest value comes first 
// slicing to ensure that maximum 5 languages are displayed of all the languages 
// used by user
const mostUsed = Object.values(languages).sort((a,b)=>{
return b.value - a.value;
}).slice(0,5)
// console.log(languages);

// most stars per language
const mostPopular = Object.values(languages).sort((a,b)=>{
  return b.stars - a.stars;
}).map((item)=>{
  // return object copy all the properties of item and modify value property
  return {...item,value:item.stars};
}).slice(0,5);
console.log(mostPopular);

// stars,forks
// first destructuring what we are getting from reduce
// returning an object where properties are object itself stars:{} and forks:{}
// total is what we are returning,i.e the object with properties
// stars:{} and forks:{}
let{stars,forks} = repos.reduce((total,item)=>{
const{stargazers_count,name,forks}= item;
total.stars[stargazers_count] = {label:name,value:stargazers_count};
total.forks[forks] = {label:name,value:forks}
return total
},{ 
  stars:{},forks:{}
})
console.log(stars);

// -5 returns last five
// reverse => to display the biggest ones first
stars = Object.values(stars).slice(-5).reverse();
forks = Object.values(forks).slice(-5).reverse();



  return (
  <section className="section">
    <Wrapper className='section-center'>
<Pie3D data={mostUsed}></Pie3D>
<Doughnut2D data={mostPopular}/>
<Column3D data={stars}/>
<Bar3D data={forks}/>
    </Wrapper>
  </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
