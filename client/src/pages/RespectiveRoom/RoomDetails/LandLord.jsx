import { styles } from "../../../Utils/Style";
import PropTypes from "prop-types";
import { Image, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import {
  apiResStatus,
  setAlertMessages,
} from "../../../Redux/Reducer/roomSlice";
import { useNavigate } from "react-router";
import phone from "../../../assets/telephone.png";
import email from "../../../assets/message.png";

const LandLord = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [result, setResult] = useState(false);
  const { isLoggedIn, id } = useSelector((state) => state.user);
  //to get usedetails
  const handleRequest = async () => {
    try {
      if (isLoggedIn) {
        const { user } = JSON.parse(localStorage.getItem("data"));
        const { data } = await axios.post(
          `${import.meta.env.VITE_APP_URL}/api/room/request-room`,
          {
            room: item,
            user,
          }
        );
        dispatch(setAlertMessages(data.message));
        dispatch(apiResStatus(true));
        setResult(true);
      } else {
        navigate("/login", {
          state: { onSuccessNavigation: `/card` },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const alreadyApplied = item.appliedCandidates.map(
    (candidate) => candidate.userid
  );
  const foundUser = alreadyApplied.find((userid) => userid === id);

  return (
    <>
      <div className={`${styles.padding} h-screen w-[35%] shadows`}>
        <div className=" border h-full w-full  md:w-[50%]`">
          <div className=" relative right-0 -top-10 overflow-hidden h-24 flex flex-col justify-center items-center">
            <Image
              width={180}
              height={80}
              src={`${import.meta.env.VITE_APP_URL}/uploads/${item.uPhoto}`}
              className=" object-contain bg-slate-50 border rounded"
            />
          </div>
          <div className={`text-center flex flex-col gap-y-2`}>
            <p className={`${styles.heroSubText} uname_text  text-primary`}>
              {item.uName}
            </p>
            <div
              className={`${styles.sectionSubText} flex flex-col gap-y-3 text-center text-primary`}
            >
              <div className="flex pl-3 items-center gap-x-2">
                <img src={phone} width={30} height={30} alt="" />
                <p>{item.uPhone}</p>
              </div>
              <div className="flex pl-3  items-center gap-x-2">
                <img src={email} width={30} height={30} alt="" />
                <p
                  onClick={() =>
                    window.open(
                      `mailto:${item.uEmail}?subject=About Room&body= Write your message`
                    )
                  }
                  className=" cursor-pointer hover:text-secondary"
                >
                  {item.uEmail}
                </p>
              </div>
              {item.status ? (
                <div className="occupied ">
                  <p>OCCUPIED</p>
                </div>
              ) : foundUser || result ? (
                <Tag color="green" className="pl-3 text-center">
                  Requested
                </Tag>
              ) : (
                <button className="btn" onClick={handleRequest}>
                  Request Room
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
LandLord.propTypes = {
  item: PropTypes.any.isRequired,
};
export default LandLord;
