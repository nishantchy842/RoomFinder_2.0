import "./searchbar.css";
import { Input } from 'antd';
import { styles } from '../Utils/Style'
// import { useState } from "react";
import { BsSearch } from 'react-icons/bs'
import axios from 'axios'
import { useNavigate } from "react-router";
const { Search } = Input;

const SearchBar = () => {
const navigate = useNavigate()
  const onSearch = async (value) => {
try{
  console.log(value);
  const {data} = await axios.get(`${import.meta.env.VITE_APP_URL}/api/room/search/${value}`)
  console.log(data.resutls)
  navigate('/result',{state:{rooms: data.resutls, value}})
}catch(error){
console.log(error)
}
  }
  return (
    <>
      <div
        className={`${styles.paddingX
          } w-full flex items-center mt-24 py-5  top-0 `}
      >

        <div className=' w-full  justify-center items-center max-w-7xl mx-auto hidden sm:flex'>
          <Search
            className="input"
            placeholder="input search text"
            allowClear
            enterButton={<span className=" text-slate-700 font-bold"> Search</span>}
            size="large"
            onSearch={onSearch}
          />
        </div>

        <div className='sm:hidden  flex flex-1 justify-end items-center'>

          <div className="searchBox">

            <input className="searchInput" type="text" name="" placeholder="Search" />
            <button className="searchButton" >

              <BsSearch />

            </button>
          </div>

        </div>

      </div>
    </>
  );
};

export default SearchBar;