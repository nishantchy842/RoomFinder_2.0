import { Avatar, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import pendingIcon from './icons/progress1.svg';
import { AiOutlineCheck } from 'react-icons/ai'
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { UPDATE_DETAILS } from '../../Redux/Reducer/roomSlice';

let timer;

const InfoField = ({ mainProps, optionalProps = {}, minLength }) => {
  //   const { dispatch } = useValue();
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch()

  const handleChange = (e) => {
    if (!editing) setEditing(true);
    clearTimeout(timer);
    timer = setTimeout(() => {
      setEditing(false);
      if (e.target.value.length < minLength) {
        if (!error) setError(true);
        if (success) setSuccess(false);
      } else {
        if (error) setError(false);
        if (!success) setSuccess(true);
      }
    }, 1000);
    dispatch(UPDATE_DETAILS({[e.target.name]: e.target.value}))
  };
  return (
    <TextField
      {...mainProps}
      {...optionalProps}
      error={error}
      helperText={error && `This field must be ${minLength} characters or more`}
      color={success ? 'success' : 'primary'}
      variant="outlined"
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {editing ? (
              <Avatar src={pendingIcon} sx={{ height: 70 }} />
            ) : (
              success && <AiOutlineCheck color="success" />
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};
InfoField.propTypes = {
  mainProps: PropTypes.object.isRequired,
  optionalProps: PropTypes.object,
  minLength: PropTypes.number.isRequired,
  InputProps: PropTypes.object,

};
export default InfoField;