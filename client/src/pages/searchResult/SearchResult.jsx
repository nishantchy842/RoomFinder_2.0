import { useLocation } from 'react-router'
import Layout from '../../Component/Layout/Layout'
import Cards from '../../Component/cards/cards'
import {styles} from '../../Utils/Style'

const SearchResult = () => {

  const { state } = useLocation()
  console.log(state.rooms, "from search result")

  return (
    <Layout>
    <p className={`${styles.heroSubText} mt-24 underline text-black text-center`}>
    <span className=' text-red-500'>{state.value} </span>
     Realated product...</p>
      <div className='flex w-[100%] justify-center items-center flex-wrap mt-6'>
     
        {
          state?.rooms.map((item) => {
            return <Cards key={item._id} item={item} />
          })
        }
      </div>
    </Layout>
  )
}

export default SearchResult
