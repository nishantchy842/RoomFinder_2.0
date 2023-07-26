import { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';

const useUsers = () => {
    const [products, setProductList] = useState([]);
    const { id } = useSelector((state) => state.user);


    const fetchProduct = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_APP_URL}/api/auth/user/${id}`)
            // alert(JSON.stringify(res.data.products))
            if (data.success) {
                setProductList(data.user);
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
export default useUsers