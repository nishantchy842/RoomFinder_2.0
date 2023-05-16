import { useNavigate } from 'react-router';
import './card.css'

const Select = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col md:flex-row gap-5 justify-center items-center flex-shrink ">
      <div className="gradient flex-wrap">
        <button 
        className="p-3 w-[150px] border border-black text-2xl uppercase rounded-lg rounded-tr-none rounded-bl-none outline-none shadow-lg hover:shadow-xl hover:text-white hover:bg-black duration-200"
        
        >
          Find a Room
        </button>
      </div>
      <div className="gradient">
        <button 
        className="p-3 w-[150px] border border-black text-2xl uppercase rounded-lg rounded-tl-none rounded-br-none outline-none shadow-lg hover:shadow-xl hover:text-white hover:bg-black  duration-200"
        onClick={()=>navigate('/add-room')}
        >
          List a Room
        </button>
      </div>
    </div>
  );
};

export default Select;
