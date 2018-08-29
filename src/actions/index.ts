import { Dispatch } from 'redux'

export const getFullName = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: 'getfull',
      payload: 'Adli Fariz Bonaputra'
    })
  }
}
