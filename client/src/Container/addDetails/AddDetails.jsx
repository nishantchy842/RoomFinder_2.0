import {
  Avatar,
  FormControl,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import InfoField from "./InfoField";
import Amenities from "./Amenities";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_DETAILS } from "../../Redux/Reducer/roomSlice";
import pendingIcon from "./icons/progress1.svg";
import { AiOutlineCheck } from "react-icons/ai";
import { styles } from "../../Utils/Style";

let timer;

const AddDetails = () => {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { title, description, price, address } = useSelector(
    (state) => state.room.details
  );
  const dispatch = useDispatch();

  const handlePriceChange = (e) => {
    dispatch(UPDATE_DETAILS({ price: e.target.value }));
    if (!editing) setEditing(true);
    clearTimeout(timer);
    timer = setTimeout(() => {
      setEditing(false);
      if (e.target.value < 1000) {
        if (!error) setError(true);
        if (success) setSuccess(false);
      } else {
        if (error) setError(false);
        if (!success) setSuccess(true);
      }
    }, 1000);
  };
  return (
    <Stack
      sx={{
        alignItems: "center",
        "& .MuiTextField-root": { width: "100%", maxWidth: 500, m: 1 },
      }}
      className="inputStyles min-h-[70vh] flex justify-start items-center"
    >
      <p className={`${styles.bold}`}>
        Address:{"  "} {address}
      </p>
      <FormControl>
        <TextField
          sx={{ width: "500px !important" }}
          error={error}
          helperText={error && `This Room rent must be 1000 or more`}
          color={success ? "success" : "primary"}
          variant="outlined"
          label="Rent Cost"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Nrs</InputAdornment>
            ),
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
          inputProps={{ type: "number", min: 1000 }}
          value={price}
          onChange={handlePriceChange}
          name="price"
          required
        />
      </FormControl>
      <InfoField
        mainProps={{ name: "title", label: "Title", value: title }}
        minLength={5}
        required
      />
      <InfoField
        mainProps={{
          name: "description",
          label: "Description",
          value: description,
          placeholder: "Describe you room ",
        }}
        minLength={10}
        optionalProps={{
          multiline: true,
          rows: 4,
          required: true,
        }}
      />
      <InfoField
        mainProps={{
          name: "people",
          label: "People",
          value: title,
          placeholder: "How many peaple can stay",
        }}
      />
      <Amenities />
    </Stack>
  );
};

export default AddDetails;
