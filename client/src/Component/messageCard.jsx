
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import CustomizedMenus from "../navigation components/customStyledMenu";
// import { setUserDetails } from "../../redux/reducers/userSlice";

const MessageCard = () => {
//   const dispatch = useDispatch();
//   const [usersDataList, setUsersDataList] = useState([]);
//   const { selectedUserDetails } = useSelector((state) => state.user);

//   const fetchUsersData = async () => {
//     const res = await fetch("http://localhost:9000/users");
//     const data = await res.json();
//     console.log(res.json());
//     // const allUsers = JSON.stringify(data);
//     console.log(data);
//     if (res) {
//       setUsersDataList(data.usersList);
//     }
//   };

//   useEffect(async () => {
//     await fetchUsersData();
//   }, []);

  return (

      
          <>
            <div
              className="recent-chat"
            //   onClick={() => item && dispatch(setUserDetails(item))}
              style={{
                backgroundColor:' #1170dd',
                //   selectedUserDetails._id == item._id ? "#1170dd" : null,
              }}
            >
              <div>
                <img
                 alt="iamge"
                ></img>
              </div>
              <div className="recent-chatRHS">
                <div className="recent-chatRhsTop">
                  <div>
                    <div style={{ fontWeight: "bold" }}>full name</div>
                  </div>
                  <div className="chatTimeStamp" placeholder="10:00 pm">
                    10:00 pm
                  </div>
                </div>
                <div className="recent-chatRhsBottom">
                  <div
                    style={{ color: "lightgrey" }}
                    className="recentMessagePreview"
                  >
                    Wassap man.
                  </div>
                </div>
              </div>
            </div>
          </>

  );
};

export default MessageCard;