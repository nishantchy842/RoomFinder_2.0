import Stack from '@mui/material/Stack';

 const AddImage=()=> {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
     <input type='file' multiple onChange={(e)=>console.log(e.target.files)}></input> 
    </Stack>
  );
}
export default AddImage