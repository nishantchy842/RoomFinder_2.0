import { useLocation } from "react-router"
import Cards from "../../../Component/cards/cards"
import Layout from "../../../Component/Layout/Layout"

const RoomsAccPlace = () => {
    const { state } = useLocation()
    console.log(state)
    return (
        <Layout>
            <div className='flex w-[100%] justify-center items-center flex-wrap mt-24'>
                {
                    state.map(item => {
                        return <Cards key={item._id} item={item} />
                    })
                }
            </div>
        </Layout>
    )
}

export default RoomsAccPlace
