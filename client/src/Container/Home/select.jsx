import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { styles } from "../../Utils/Style";
import "./card.css";

const Select = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  console.log(isLoggedIn);
  const navigate = useNavigate();
  return (
    <div className=" w-[80%]  flex flex-col md:flex-row gap-5 justify-center items-center flex-shrink mt-16">
      <div className="gradient w-[60%]">
        <button
          className={`${styles.heroSubText} p-3 w-[150px] border border-black text-2xl uppercase rounded-lg rounded-tr-none rounded-bl-none outline-none bg-black text-white shadow-lg hover:shadow-xl hover:text-black hover:bg-white duration-200`}
          onClick={() => navigate("/rooms")}
        >
          Find a Room
        </button>
      </div>
      <div className="gradient w-[60%]">
        <button
          className={`${styles.heroSubText} p-3 w-[150px] border border-black text-2xl uppercase rounded-lg rounded-tr-none rounded-bl-none outline-none bg-black text-white shadow-lg hover:shadow-xl hover:text-black hover:bg-white duration-200`}
          onClick={() => {
            isLoggedIn
              ? navigate("/add-room")
              : navigate("/login", {
                  state: { onSuccessNavigation: "/add-room" },
                });
          }}
        >
          List a Room
        </button>
      </div>
    </div>
  );
};

export default Select;
