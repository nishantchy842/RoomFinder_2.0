import { Pagination, Stack } from '@mui/material';
import PropTypes from 'prop-types';

const Paginations = ({ pageNumber, handlePage }) => {

  return (
    <div>
      <Stack spacing={2}>
        <Pagination count={pageNumber} color="primary" onClick={(e) => handlePage(e.target.innerText)} />
      </Stack>
    </div>
  )
}
Paginations.propTypes = {
  handlePage: PropTypes.func,
  pageNumber: PropTypes.number
}
export default Paginations
