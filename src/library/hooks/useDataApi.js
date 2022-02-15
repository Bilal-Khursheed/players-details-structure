import { useState, useReducer, useEffect } from "react";

const SuperFetch = async (url, body = {}) => {
  let options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  // authentication
  // we will had custom headers here.
  console.log("working till here", url);
  let fetchResponse = await fetch(url, options);
  fetchResponse = await fetchResponse.json();
  return fetchResponse;
};

function dataFetchReducer(state, action) {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case "ASC_DATA":
      return {
        ...state,
        data: [...state.data.sort((a, b) => (a.realName > b.realName) * 2 - 1)],
        loading: false,
        error: false,
      };
    case "DESC_DATA":
      return {
        ...state,
        data: [...state.data.sort((a, b) => (b.realName > a.realName) * 2 - 1)],
        loading: false,
        error: false,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      throw new Error();
  }
}

const useDataApi = (initialUrl, initialData = []) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: false,
    error: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await SuperFetch(url);
        console.log("result", result);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);
  const doFetch = (url) => {
    setUrl(url);
  };
  const sort = (order) => {
    //Asc => 1, Desc => 2
    if (order == 1) {
      dispatch({ type: "ASC_DATA" });
    } else {
      dispatch({ type: "DESC_DATA" });
    }
  };

  return { ...state, doFetch, sort };
};

export default useDataApi;
