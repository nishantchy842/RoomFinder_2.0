// import { Send } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Stack,
  Step,
  StepButton,
  Stepper,
} from '@mui/material';
import { useEffect, useState } from 'react';
// import { useValue } from '../../context/ContextProvider';
// import { createRoom } from '../../actions/room';
import { useSelector } from 'react-redux';
import { MdOutlineFilePresent } from 'react-icons/md'
import AddLocation from './addLocation/AddLocation';
import AddDetails from './addDetails/AddDetails';
import Layout from '../Component/Layout/Layout';
import axios from 'axios'
// import AddImages from './addImage/AddImage';

const AddRoom = () => {
  const { details, location, amenities } = useSelector(state => state.room)
  const [images, setImages] = useState([])
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([
    { label: 'Location', completed: false },
    { label: 'Details', completed: false },
    { label: 'Images', completed: false },
  ]);
  const [showSubmit, setShowSubmit] = useState(false);
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((activeStep) => activeStep + 1);
    } else {
      const stepIndex = findUnfinished();
      setActiveStep(stepIndex);
    }
  };
  const checkDisabled = () => {
    if (activeStep < steps.length - 1) return false;
    const index = findUnfinished();
    if (index !== -1) return false;
    return true;
  };
  const findUnfinished = () => {
    return steps.findIndex((step) => !step.completed);
  };

  useEffect(() => {
    if (images.length) {
      if (!steps[2].completed) setComplete(2, true);
    } else {
      if (steps[2].completed) setComplete(2, false);
    }
  }, [images]);
  useEffect(() => {
    if (details.title.length > 4 && details.description.length > 9) {
      if (!steps[1].completed) setComplete(1, true);
    } else {
      if (steps[1].completed) setComplete(1, false);
    }
  }, [details]);
  useEffect(() => {
    if (location.lng || location.lat) {
      if (!steps[0].completed) setComplete(0, true);
    } else {
      if (steps[0].completed) setComplete(0, false);
    }
  }, [location]);

  const setComplete = (index, status) => {
    setSteps((steps) => {
      steps[index].completed = status;
      return [...steps];
    });
  };
  useEffect(() => {
    if (findUnfinished() === -1) {
      if (!showSubmit) setShowSubmit(true);
    } else {
      if (showSubmit) setShowSubmit(false);
    }
  }, [steps]);

  const handleSubmit = async () => {

    const room = {
      lng: location.lng,
      lat: location.lat,
      price: details.price,
      title: details.title,
      description: details.description,
      amenities: amenities,
    };
    console.log(room)
    const bodyFormData = new FormData();

    Object.keys(room).map((item) => {
      bodyFormData.append(item, room[item]);
    })
    console.log(images)
  debugger
  for (let i = 0; i < images.length; i++) {
    bodyFormData.append('photos', images[i]);
  }

    const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/room/addroom`, bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(response.data);
  
  }



  return (
    <Layout >
      <Container sx={{ my: 15 }}
      >
        <Stepper
          alternativeLabel
          nonLinear
          activeStep={activeStep}
          sx={{ mb: 3 }}
        >
          {steps.map((step, index) => (
            <Step key={step.label} completed={step.completed}>
              <StepButton onClick={() => setActiveStep(index)}>
                {step.label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ pb: 7 }}>
          {
            {
              0: <AddLocation />,
              1: <AddDetails />,
              2: <div>
                <input className='btn' type='file' multiple onChange={(e) => setImages(e.target.files)} />
              </div>
            }[activeStep]
          }

          <Stack direction="row" sx={{ pt: 2, justifyContent: 'space-around' }}>
            <Button
              color="inherit"
              disabled={!activeStep}
              onClick={() => setActiveStep((activeStep) => activeStep - 1)}
            >
              Back
            </Button>
            <Button disabled={checkDisabled()} onClick={handleNext}>
              Next
            </Button>
          </Stack>
          {showSubmit && (
            <Stack sx={{ alignItems: 'center' }}>
              <button
               className='btn'
                onClick={handleSubmit}
              >
                Submit
              </button>
            </Stack>
          )}
        </Box>
      </Container>
    </Layout>
  );
};

export default AddRoom;
