import { configureStore } from '@reduxjs/toolkit'

import fileSlice from './reducers/file'
import userSlice from './reducers/user'
import workSlice  from './reducers/work'
import projectSlice from './reducers/project'
import invoiceSlice from './reducers/invoice'

const store = configureStore({
  reducer:{
    user:userSlice,
    file:fileSlice,
    project: projectSlice,
    work: workSlice,
    invoice: invoiceSlice,
  }
})

export default store