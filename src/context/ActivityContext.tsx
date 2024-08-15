import { Dispatch, ReactNode, createContext, useReducer } from 'react'
import { ActivityActions, ActivityState, activityReducer, initialState } from '../reducers/activity-reducer'

export type ActivityProviderProps = {
  children: ReactNode
}

export type ActivityContextProps = {
  state: ActivityState
  dispatch: Dispatch<ActivityActions>
}

export const ActivityContext = createContext<ActivityContextProps>(null!)

export const ActivityProvider = ({ children }: ActivityProviderProps) => {

  const [ state, dispatch ] = useReducer( activityReducer, initialState )

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </ActivityContext.Provider>
  )
}

