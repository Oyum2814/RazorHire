import {
  useReducer,
  createContext,
  useContext,
  // useEffect
} from "react";
// import { getUserProfile } from "api/user";

export const AppContext = createContext();

const initialState = {
  isLoading: true,
  userProfile: {
    name: "Shwet",
  },
};

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "SET_LOADING":
      return { ...state, isLoading: payload };
    case "SET_USER_PROFILE":
      return { ...state, userProfile: payload };
    default:
      return state;
  }
}

export function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function setLoading(isLoading) {
    dispatch({ type: "SET_LOADING", payload: isLoading });
  }

  // function fetchUserProfile() {
  //   getUserProfile()
  //     .then((resp) => {
  //       dispatch({ type: "SET_USER_PROFILE", payload: resp.data.data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  // useEffect(() => {
  //   fetchUserProfile();
  // }, []);

  const value = {
    state,
    setLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
