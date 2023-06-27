import { Avatar, Box } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Layout from '../../../Component/Layout/Layout'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react';

import { styles } from '../../../Utils/Style'
import { Popconfirm, message } from 'antd';
import { apiResStatus, setAlertMessages } from '../../../Redux/Reducer/roomSlice';
import { useDispatch } from 'react-redux';

const ManageUsers = () => {

    const [rowId, setRowId] = useState(null);
    const [users, setUsers] = useState([])
    const [pageSize, setPageSize] = useState(5);


    const handleAllUsers = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_APP_URL}/api/auth/get_all_users`)
            setUsers(data.user)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleAllUsers()
    }, [])


    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    }
    const [isDelete, setIsDeleted] = useState(false)
    const dispatch = useDispatch()
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_APP_URL}/api/auth/delete_user/${id}`)
            if (data && data.success) {
                dispatch(setAlertMessages(data.message))
                dispatch(apiResStatus(true))
                setIsDeleted(true)
            } else {
                dispatch(setAlertMessages(data.message))
                dispatch(apiResStatus(false))
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleDelete()
    }, [isDelete])

    const columns = useMemo(
        () => [
            {
                field: 'profile',
                headerName: 'Profile',
                width: 60,
                renderCell: (params) => <Avatar alt="Remy Sharp" src={`${import.meta.env.VITE_APP_URL}/uploads/${params.row.profile}`}
                    sx={{ width: 50, height: 50 }}> </Avatar>,

            },
            { field: 'name', headerName: 'Name', width: 170 },
            { field: 'email', headerName: 'Email', width: 200 },
            {
                field: 'role',
                headerName: 'Role',
                width: 100,
                // type: 'singleSelect',
                // valueOptions: ['basic', 'editor', 'admin'],
                // editable: true,
            },
            {
                field: 'address',
                headerName: 'Address',
                width: 100,
            },
            {
                field: 'phone',
                headerName: 'Phone',
                width: 100,
            },
            {
                field: 'createdAt',
                headerName: 'Created At',
                width: 200,
            },
            { field: '_id', headerName: 'Id', width: 220 },
            {
                field: 'actions',
                headerName: 'Actions',
                type: 'actions',
                renderCell: (params) => (
                    <Popconfirm
                        title="Delete the room"
                        description="Are you sure to remove this users?"
                        onConfirm={() => handleDelete(params.row._id)}
                        onCancel={cancel}
                        okText={<span style={{ color: 'green' }}>Yes</span>}
                        cancelText={<span style={{ color: 'red' }}>No</span>}
                    >
                        <button type="link" className="btn uppercase">Delete </button>
                    </Popconfirm>
                ),
            },
        ],
        [rowId]
    );


    return (
        <Layout>
            <div className='mt-[80px]'>
                <div className={`${styles.heroSubHeadText} w-full flex justify-center items-center`}>
                    <p>Manage users</p>
                </div>
                <Box
                    sx={{
                        height: 500,
                        width: '100%',
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "20px"
                    }}
                >

                    <DataGrid
                        columns={columns}
                        rows={users}
                        getRowId={(row) => row._id}
                        rowsPerPageOptions={[5, 10, 20]}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        getRowSpacing={(params) => ({
                            top: params.isFirstVisible ? 0 : 5,
                            bottom: params.isLastVisible ? 0 : 5,
                        })}
                        sx={{
                            [`& .${gridClasses.row}`]: {
                                bgcolor: (theme) =>
                                    theme.palette.mode === 'light' ? "light" : "grey",
                            },
                            width: "80%",
                        }}
                        onCellEditCommit={(params) => setRowId(params.id)}
                    />
                </Box>
            </div>
        </Layout>
    )
}

export default ManageUsers
