import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        show(state, action) {
           return action.payload 
        },
        hide(state, action) {
            return null
        }
    }
})
export const {show, hide} = notificationSlice.actions
export const setNotification = (action, secs) => {

    return async dispatch => {
        dispatch(show(action))
    
        setTimeout(() => {
            dispatch(hide())
        }, 1000*secs)
        }
}
  
export default notificationSlice.reducer