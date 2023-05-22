import { useNavigate } from 'react-router';
import {useSelector} from 'react-redux'
import './card.css'

const Select = () => {
  const {isLoggedIn} = useSelector(state=>state.user)
  console.log(isLoggedIn)
  const navigate = useNavigate()
  return (
    <div className=" w-[80%] flex flex-col md:flex-row gap-5 justify-center items-center flex-shrink ">
      <div className="gradient w-[60%]" >
        <button 
        className="p-3 w-[150px] border border-black text-2xl uppercase rounded-lg rounded-tr-none rounded-bl-none outline-none shadow-lg hover:shadow-xl hover:text-white hover:bg-black duration-200"
        onClick={()=>navigate('/card')}
        >
          Find a Room
        </button>
      </div>
      <div className="gradient w-[60%]">
        <button 
        className="p-3 w-[150px] border border-black text-2xl uppercase rounded-lg rounded-tl-none rounded-br-none outline-none shadow-lg hover:shadow-xl hover:text-white hover:bg-black  duration-200"
          onClick={()=>{
            isLoggedIn ?
            navigate('/add-room') :
            navigate("/login", { state: { onSuccessNavigation: "/add-room" } });
          }}
        >
          List a Room
        </button>
      </div>
    </div>
  );
};

export default Select;
