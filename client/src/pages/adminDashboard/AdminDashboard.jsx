import { useState } from "react";
import "./admindashboard.css";
import { FaUserFriends, FaHouseUser } from "react-icons/fa";
import Layout from "../../Component/Layout/Layout";
import Piechart from "./Piechart";
import Linechart from "./Linechart";
import { styles } from "../../Utils/Style";
import { Box, Divider, List, Paper, Typography } from "@mui/material";

const AdminDashboard = () => {
  const [recentUsers, setRecentUsers] = useState([
    {
      id: 1,
      username: "John Smith",
      image:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&w=1000&q=80",
      timestamp: "2023-05-29 10:30 AM",
    },
    {
      id: 2,
      username: "Emily Davis",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&w=1000&q=80",
      timestamp: "2023-05-28 03:45 PM",
    },
    {
      id: 3,
      username: "Michael Johnson",
      image:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww&w=1000&q=80",
      timestamp: "2023-05-27 09:15 AM",
    },
    {
      id: 4,
      username: "Sophia Martinez",
      image:
        "https://miro.medium.com/v2/resize:fit:1400/1*y_uyQN1xEjppGVWJJkibMQ.jpeg",
      timestamp: "2023-05-27 09:15 AM",
    },
  ]);

  const [recentRooms, setRecentRooms] = useState([
    {
      id: 1,
      roomtitle: "Great room",
      imageName:
        "https://imageio.forbes.com/specials-images/imageserve/5cdb058a5218470008b0b00f/Nobu-Ryokan-Malibu/0x0.jpg?format=jpg&height=1009&width=2000",
      timestamp: "2023-05-26 02:00 PM",
    },
    {
      id: 2,
      roomtitle: "Good room",
      imageName:
        "https://hips.hearstapps.com/hmg-prod/images/kips-bay-dallas-2021-bedroom-martyn-lawrence-bullard-1632328947.jpg",
      timestamp: "2023-05-25 11:45 AM",
    },
    {
      id: 3,
      roomtitle: "Best room",
      imageName:
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&w=1000&q=80",
      timestamp: "2023-05-24 05:30 PM",
    },
    {
      id: 4,
      roomtitle: "Babal room",
      imageName:
        "https://m.lemontreehotels.com/getattachment/a991b8ea-7ff7-45c4-9c3a-4c0476cef534/Business-Rooms.aspx",
      timestamp: "2023-05-24 05:30 PM",
    },
  ]);

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
            <Typography variant="h4">124</Typography> {/* user length */}
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
            <Typography variant="h4">222</Typography> {/* room length */}
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: '1/4' }}>
          <Box>
            <Typography variant="h4">Recently added Users</Typography>
            <List>
              {recentUsers.map((user) => (
                <div key={user.id}>
                  <img
                    src={user.image}
                    alt={`User ${user.id}`}
                    className="admin-recent-data-img"
                  />
                  <div className="admin-recent-name">{user.username}</div>
                  <div className="admin-recent-time">
                    Time created: {user.timestamp}
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
                <div key={room.id}>
                  <img
                    src={room.imageName}
                    alt={`Room ${room.id}`}
                    className="admin-recent-data-img"
                  />
                  <div className="admin-recent-name">{room.roomtitle}</div>
                  <div className="admin-recent-time">
                    Time added: {room.timestamp}
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
