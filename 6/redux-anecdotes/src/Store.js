import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'

const Store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      visibilityFilter: filterReducer,
      notification: notificationReducer
    }
  })

  export default Store