import { configureStore } from '@reduxjs/toolkit';
import location from './locationReducer'

const store = configureStore({
  reducer: location
})

export default store;