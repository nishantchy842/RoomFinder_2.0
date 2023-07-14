import { useEffect, useState } from "react";
import "./admindashboard.css";
import { FaUserFriends, FaHouseUser } from "react-icons/fa";
import Layout from "../../Component/Layout/Layout";
import Piechart from "./Piechart";
import Linechart from "./Linechart";
import { Box, Divider, List, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { totalUsers } from "../../Redux/Reducer/userSlice";
import { totalRoom } from "../../Redux/Reducer/roomSlice";
import moment from 'moment'

const AdminDashboard = () => {
  const [users, setusers] = useState(0)
  const [rooms, setRooms] = useState(0)
  const dispatch = useDispatch()

  const totalusers = async () => {
    const { data } = await axios.get('http://localhost:8000/api/auth/totaluser')
    setusers(data.totaluser)
    dispatch(totalUsers(data.totaluser))
  }

  const totalrooms = async () => {
    const { data } = await axios.get('http://localhost:8000/api/room/totalroom')
    setRooms(data.totalRoom)
    dispatch(totalRoom(data.totalRoom))
  }

  const [recentUsers, setRecentUsers] = useState([]);

  const recentUser = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/auth/recentusers`)
    setRecentUsers(data.recentUser)
  }

  const [recentRooms, setRecentRooms] = useState([])

  const recentRoom = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/room/recentroom`)
    setRecentRooms(data.recentRoom)
  }


  useEffect(() => {
    totalusers()
    totalrooms()
    recentUser()
    recentRoom()
  }, [])

  return (
    <Layout>
      <Box
        sx={{
          display: { xs: 'flex', md: 'grid' },
          gridTemplateColumns: 'repeat(3,1fr)',
          gridAutoRows: 'minmax(100px, auto)',
          gap: 3,
          textAlign: 'center',
          flexDirection: 'column',
          marginTop: "90px",
        }}
      >
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4">Total Users</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div className="admin-data-icon">
              <FaUserFriends />
            </div>
            <Typography variant="h4" className=" text-primary  p-2">{users}</Typography> {/* user length */}
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4">Total Rooms</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div className="admin-data-icon">
              <FaHouseUser />
            </div>
            <Typography variant="h4" className=" text-primary p-2">{rooms}</Typography> {/* room length */}
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: '1/4' }}>
          <Box>
            <Typography variant="h4">Recently added Users</Typography>
            <List>
              {recentUsers.map((user) => (
                <div key={user._id}>
                  <img
                    src={`${import.meta.env.VITE_APP_URL}/uploads/${user.profile}`}
                    alt={`User ${user.id}`}
                    className="admin-recent-data-img"
                  />
                  <div className="admin-recent-name">Name: {user.name}</div>
                  <div className="admin-recent-time">
                    Time created: {moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                  </div>
                </div>
              ))}
            </List>
          </Box>
          <Divider sx={{ mt: 3, mb: 3, opacity: 0.7 }} />
          <Box>
            <Typography variant="h4">Recently added Rooms</Typography>
            <List>
              {recentRooms.map((room) => (
                <div key={room._id}>
                  <img
                    src={room.img_collection[0]}
                    alt={`Room ${room.id}`}
                    className="admin-recent-data-img"
                  />
                  <div className="admin-recent-name">{room.title}</div>
                  <div className="admin-recent-name">Address: {room.place}</div>
                  <div className="admin-recent-time">
                    Time added:{moment(room.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                  </div>
                </div>
              ))}
            </List>
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ p: 2, gridColumn: '1/3' }}>
          <Piechart />
        </Paper>
        <Paper elevation={3} sx={{ p: 2, gridColumn: '1/3' }}>
          <Linechart />
        </Paper>
      </Box>
    </Layout>
  );
};

export default AdminDashboard;
