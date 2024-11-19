import React from 'react'
import PropTypes from 'prop-types';
import './Home.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
const Home = ({sidebar}) => {
  return (
    <>
      <Sidebar sidebar={sidebar}/>
    
    </>
  )
}

Home.propTypes = {
  sidebar: PropTypes.func.isRequired, // setSidebar should be a required function
};


export default Home
