
import { useEffect, useState } from 'react'
import './card.css'
import axios from 'axios'
import Layout from '../Layout/Layout'
import Cards from './cards'
import SearchBar from '../../Utils/SearchBar'
import Paginations from '../../Utils/Pagination'
import { Drawer, Radio } from 'antd'
import { AiOutlineAlignLeft } from 'react-icons/ai'
import { Prices } from '../../config/Price'
import { styles } from '../../Utils/Style'

const RoomCard = () => {
    const [room, setRoom] = useState()
    const [pageNumber, setPageNumber] = useState()
    const [open, setOpen] = useState(false)
    const [radio, setRadio] = useState([]);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const getAllRooms = async (page) => {
        const res = await axios(`${import.meta.env.VITE_APP_URL}/api/room/product-list/${page}?size=6`)
        setRoom(res.data.rooms)
        setPageNumber(res.data.totalItem)
    }

    useEffect(() => {
        if (!radio.length) getAllRooms();
    }, [radio.length]);

    //get filterd product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_APP_URL}/api/room/filterprice`, {
                radio,
            });
            setRoom(data?.rooms);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (radio.length) filterProduct();
    }, [radio]);
    return (
        <Layout>
            <div className='absolute top-[8rem] left-5'>
                <button className='btn' type="primary" onClick={showDrawer}>
                    <AiOutlineAlignLeft />
                </button>
                <Drawer title="Price Filter" placement="right" onClose={onClose} open={open}>
                    <div className="d-flex flex-column">
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {Prices?.map((p) => (
                                <div key={p._id} className='m-5'>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                </Drawer>
            </div>
            <div >
                <SearchBar />
            </div>
            <div className={`${styles.paddingX} flex w-[100%] flex-row items-start flex-wrap mt-6`}>
                {
                    room?.map((item) => {
                        return (
                            <Cards key={item._id} item={item} />
                        )
                    })
                }
            </div>
            {
                radio.length == 0 ?
                    <div className="flex justify-end p-10">
                        <Paginations pageNumber={pageNumber} handlePage={getAllRooms} />
                    </div> : " "
            }

        </Layout>
    )
}

export default RoomCard
