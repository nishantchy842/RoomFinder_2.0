import { useEffect, useState } from 'react'
import axios from 'axios';

const useRooms = () => {
    const [products, setProductList] = useState([]);


    const fetchProduct = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APP_URL}/api/room/room`)
            // alert(JSON.stringify(res.data.products))
            if (res.data.success) {
                setProductList(res.data.rooms);
            }
        } catch (error) {
            console.log(error);
            // toast.error("Something wwent wrong in geeting rooms");
        }
    }

    useEffect(() => {
        fetchProduct();
    }, []);
    return products
}
export default useRooms