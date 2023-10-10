import { removeFromLocale } from "utils"
import { setUserData, setAuthToken } from "store"

export const userLogout = () => {
  return dispatch => {
    removeFromLocale()
    dispatch(setAuthToken(''))
    dispatch(setUserData({}))
  }
}
