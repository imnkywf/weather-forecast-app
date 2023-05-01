const initialState = 'shanghai'
export default function locationReducer(prevState = initialState, action) {
  const { type, data } = action
  switch (type) {
    case 'sendLocation':
      return data
    default:
      return prevState
  }
}

