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
import { useDispatch, useSelector } from 'react-redux';
import AddLocation from './addLocation/AddLocation';
import AddDetails from './addDetails/AddDetails';
import Layout from '../Component/Layout/Layout';
import axios from 'axios'
import { UPDATE_AMENITIES, UPDATE_DETAILS, apiResStatus, setAlertMessages } from '../Redux/Reducer/roomSlice';
import { useNavigate } from 'react-router';

const AddRoom = () => {
  const { details, location, amenities } = useSelector(state => state.room)
  const [images, setImages] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
      address: details.address,
      amenities: amenities,
    };
    const bodyFormData = new FormData();

    Object.keys(room).map((item) => {
      bodyFormData.append(item, room[item]);
    })
    for (let i = 0; i < images.length; i++) {
      bodyFormData.append('photos', images[i]);
    }

    const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/room/addroom`, bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (response && response.data.success) {
      dispatch(setAlertMessages(response.data.message))
      dispatch(apiResStatus(true))
      dispatch(UPDATE_DETAILS({ title: '', price: 0, description: '', address: '' }))
      dispatch(UPDATE_AMENITIES(''))
      setImages('')
      navigate('/mypost')
      
    } else {
      dispatch(setAlertMessages(response.data.message))
      dispatch(apiResStatus(false))
    }
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
                <div className="m-3">
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
                    onChange={(e) => setImages([...e.target.files])}
                    multiple
                    hidden
                  />
                </div>
                <div className="mb-3 flex flex-wrap flex-shrink-0 gap-3">
                  {images && images.map((item, id) => {
                    return (
                      <div className="text-center" key={id}>
                        <img
                          src={URL.createObjectURL(item)}
                          alt="product_photo"
                          width={'200px'}
                          height={'200px'}
                          className="img img-responsive "
                        />
                      </div>
                    )
                  })}
                </div>
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
