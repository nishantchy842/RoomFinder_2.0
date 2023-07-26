import { useEffect, useState } from "react";
import "./card.css";
import axios from "axios";
import Layout from "../Layout/Layout";
import Cards from "./cards";
import SearchBar from "../../Utils/SearchBar";
import Paginations from "../../Utils/Pagination";
import { Drawer, Popconfirm, Radio, message } from "antd";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { Prices } from "../../config/Price";
import { styles } from "../../Utils/Style";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  UPDATE_AMENITIES,
  UPDATE_DETAILS,
  UPDATE_IMAGES,
  UPDATE_LOCATION,
  apiResStatus,
  setAlertMessages,
} from "../../Redux/Reducer/roomSlice";

const RoomCard = () => {
  const [room, setRoom] = useState();
  const [pageNumber, setPageNumber] = useState();
  const [open, setOpen] = useState(false);
  const [radio, setRadio] = useState([]);
  // const [sort, setSort] = useState(false)

  const { userRole } = useSelector((state) => state.user);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const getAllRooms = async (page) => {
    const res = await axios(
      `${import.meta.env.VITE_APP_URL}/api/room/product-list/${page}?size=6`
    );
    setRoom(res.data.rooms);
    setPageNumber(res.data.totalItem);
  };

  useEffect(() => {
    if (!radio.length) getAllRooms();
  }, [radio.length]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/room/filterprice`,
        {
          radio,
        }
      );
      setRoom(data?.rooms);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (radio.length) filterProduct();
  }, [radio]);

  const [place, setPlace] = useState([]);
  const navigate = useNavigate();
  const getAllPlaces = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/room/placename`
      );
      setPlace(data.uniquePlaces);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPlaces();
  }, []);

  const handlePlace = async (item) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/room/filter/${item}`
      );
      if (data) {
        navigate(`/rooms/${item}`, { state: data.products });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //handle sort
  // const handleSort = async () => {
  //     try {
  //         const { data } = await axios.get(`${import.meta.env.VITE_APP_URL}/api/room/sort`)
  //         setRoom(data?.rooms)
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  // useEffect(() => {
  //     if (sort == true) {
  //         handleSort()
  //     } else {
  //         getAllRooms();
  //     }
  // }, [sort])

  const dispatch = useDispatch();
  //handle delete room
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_URL}/api/room/deleteroom/${id}`
      );
      if (data && data.success) {
        dispatch(setAlertMessages(data.message));
        dispatch(apiResStatus(true));
        // setIsDeleted(true)
      } else {
        dispatch(setAlertMessages(data.message));
        dispatch(apiResStatus(false));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  //when update button click you will get the room by its id and dispatch to the redux

  const handleUpdate = async (rid) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/room//single-room/${rid}`
      );
      console.log(data);
      dispatch(UPDATE_LOCATION({ lng: data.room.lng, lat: data.room.lat }));
      dispatch(
        UPDATE_DETAILS({
          title: data.room.title,
          description: data.room.description,
          price: data.room.price,
          address: data.room.address,
        })
      );
      data.room?.amenities.map((item) => {
        return dispatch(UPDATE_AMENITIES(item.split(",")));
      });
      dispatch(UPDATE_IMAGES(data.room?.img_collection));
      navigate("/update-room", { state: rid });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookedRoom = async (id) => {
    const { data } = await axios.put(
      `${import.meta.env.VITE_APP_URL}/api/room/occupied/${id}`
    );
    if (data.status) {
      dispatch(setAlertMessages(data.message));
    } else {
      dispatch(setAlertMessages("your room is released"));
    }
  };
  return (
    <Layout>
      <div className="absolute top-[8rem] left-5">
        <button className="btn" type="primary" onClick={showDrawer}>
          <AiOutlineAlignLeft />
        </button>
        <Drawer
          title={<p className=" capitalize text-lg font-bold">Filter</p>}
          placement="right"
          onClose={onClose}
          open={open}
        >
          <p className=" capitalize text-lg font-bold border-b-2">
            Filter by price
          </p>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id} className="m-5">
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="addressFilter">
            <p className=" capitalize text-lg font-bold border-b-2">
              filter by address
            </p>
            <div className="flex flex-col">
              {place?.map((p) => {
                return (
                  <li
                    className="place_name"
                    key={p._id}
                    onClick={(e) => handlePlace(e.target.innerText)}
                  >
                    {p}
                  </li>
                );
              })}
            </div>
          </div>
        </Drawer>
      </div>
      <div>
        <div className=" h-[100px] w-[100vw]">
          <SearchBar />
          {userRole == "admin" ? (
            <div
              className={`${styles.heroSubHeadText} w-full flex justify-center items-center`}
            >
              <p>Manage rooms</p>
            </div>
          ) : (
            " "
          )}
        </div>
      </div>

      <div
        className={`${styles.paddingX} flex w-[100%] flex-row items-start flex-wrap mt-6`}
      >
        {userRole == "admin"
          ? room?.map((item) => {
              return (
                <div
                  key={item._id}
                  className=" border-b-2  flex flex-col justify-center items-center hover:bg-[#f5f5f5]"
                >
                  <Cards item={item} />
                  <div className=" mb-4 w-[40%] flex justify-around items-center gap-x-2">
                    <button
                      className="btn uppercase"
                      onClick={() => handleBookedRoom(item._id)}
                    >
                      Occupied
                    </button>
                    <Popconfirm
                      title="Delete the room"
                      description="Are you sure to delete this room?"
                      onConfirm={() => handleDelete(item._id)}
                      onCancel={cancel}
                      okText={<span style={{ color: "green" }}>Yes</span>}
                      cancelText={<span style={{ color: "red" }}>No</span>}
                    >
                      <button type="link" className="btn uppercase">
                        Delete{" "}
                      </button>
                    </Popconfirm>
                    <button
                      className="btn uppercase"
                      onClick={() => handleUpdate(item._id)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              );
            })
          : room?.map((item) => {
              return <Cards key={item._id} item={item} />;
            })}
      </div>
      {radio.length == 0 ? (
        <div className="flex justify-end p-10">
          <Paginations pageNumber={pageNumber} handlePage={getAllRooms} />
        </div>
      ) : (
        " "
      )}
    </Layout>
  );
};

export default RoomCard;
