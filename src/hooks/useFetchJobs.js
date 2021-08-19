import { useEffect, useReducer } from "react";
import { ACTIONS } from "../utils/constants";
import { setAuthToken, getPrograms, getResidents } from "../services/services";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { ...state, loading: true, programs: [], residents: [] };
    case ACTIONS.GET_DATA:
      return {
        ...state,
        loading: false,
        programs: action.payload.programs,
        residents: action.payload.residents,
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        programs: [],
        residents: [],
      };
    default:
      return state;
  }
};

const onWindowLoad = async (dispatch) => {
  if (!sessionStorage.getItem("authToken")) {
    try {
      const { data } = await setAuthToken();
      sessionStorage.setItem("authToken", data.token);
    } catch (e) {
      dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
    }
    if (sessionStorage.getItem("authToken")) {
      try {
        const programsList = await getPrograms(
          sessionStorage.getItem("authToken")
        );
        const residentsList = await getResidents(
          sessionStorage.getItem("authToken")
        );
        dispatch({
          type: ACTIONS.GET_DATA,
          payload: { programs: programsList, residents: residentsList },
        });
      } catch (e) {
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      }
    }
  } else if (sessionStorage.getItem("authToken")) {
    try {
      const programsList = await getPrograms(
        sessionStorage.getItem("authToken")
      );
      const residentsList = await getResidents(
        sessionStorage.getItem("authToken")
      );
      dispatch({
        type: ACTIONS.GET_DATA,
        payload: { programs: programsList, residents: residentsList },
      });
    } catch (e) {
      dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
    }
  }
};

export const useFetchJobs = () => {
  const [state, dispatch] = useReducer(reducer, {
    programs: [],
    residents: [],
    loading: true,
  });

  useEffect(() => {
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    window.addEventListener("load", () => {
      onWindowLoad(dispatch);
    });
  }, []);

  return { state };
};
