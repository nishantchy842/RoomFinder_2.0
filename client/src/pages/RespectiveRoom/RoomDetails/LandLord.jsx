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

  console.log(foundUser);
  return (
    <>
      <div
        className={`${styles.padding} w-full min-h-[70vh] shadows lg:w-[40%]`}
      >
        <div className=" min-h-[100vh] border w-full  md:w-[50%]`">
          <div className=" relative right-0 -top-10 overflow-hidden h-24 flex flex-col justify-center items-center">
            <Image
              width={180}
              height={80}
              src={`${import.meta.env.VITE_APP_URL}/uploads/${item.uPhoto}`}
              className=" object-contain bg-slate-50 border rounded"
            />
          </div>
          <div className={`${styles.paddingX}`}>
            <p className={`${styles.heroSubText} text-center text-primary`}>
              {item.uName}
            </p>
            <div
              className={`${styles.sectionSubText} ${styles.paddingY} text-center text-primary`}
            >
              <p>Mobile: {item.uPhone}</p>
              <p
                onClick={() =>
                  window.open(
                    `mailto:${item.uEmail}?subject=About Room&body= Write your message`
                  )
                }
                className=" cursor-pointer hover:text-secondary"
              >
                Email: {item.uEmail}
              </p>
              {item.status ? (
                <div className="occupied">
                  <p>OCCUPIED</p>
                </div>
              ) : foundUser || result ? (
                <Tag color="green">Requested</Tag>
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
