import {Pagination,Stack} from '@mui/material';

const Paginations = () => {
  return (
    <div>
    <Stack spacing={2}>
    <Pagination count={10} color="primary" onClick={(e)=>console.log(e.target.innerText)} />
  </Stack>
    </div>
  )
}

export default Paginations
