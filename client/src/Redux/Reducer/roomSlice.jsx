import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  currentUser: null,
  openLogin: false,
  loading: false,
  alert: { isApiSuccessMsgOpen: false, apiResIsSuccess: true, apiSuccessMessage: '' },
  profile: { open: false, file: null, photoURL: '' },
  images: [],
  details: { title: '', description: '', price: 0, address: '', place: '' },
  amenities: [],
  location: { lng: 0, lat: 0 },
  rooms: [],
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    UPDATE_LOCATION: (state, action) => {
      return { ...state, location: action.payload }
    },
    UPDATE_DETAILS: (state, action) => {
      return { ...state, details: { ...state.details, ...action.payload } };
    },
    UPDATE_AMENITIES: (state, action) => {
      return { ...state, amenities: [...action.payload] };
    },
    UPDATE_IMAGES: (state, action) => {
      return { ...state, images: [action.payload] };
    },
    DELETE_IMAGES: (state, action) => {
      return {
        ...state,
        images: state.images.filter((image) => image !== action.payload),
      };
    },
    setAlertMessages: (state, actions) => {
      state.alert.apiSuccessMessage = actions.payload
      state.alert.isApiSuccessMsgOpen = true
    },
    resetAlertMessages: (state) => {
      state.alert.apiSuccessMessage = ''
      state.alert.isApiSuccessMsgOpen = false
    },
    apiResStatus: (state, actions) => {
      state.alert.apiResIsSuccess = actions.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  UPDATE_LOCATION,
  UPDATE_DETAILS,
  UPDATE_AMENITIES,
  UPDATE_IMAGES,
  DELETE_IMAGES,
  setAlertMessages,
  resetAlertMessages,
  apiResStatus
} = roomSlice.actions

export default roomSlice.reducer