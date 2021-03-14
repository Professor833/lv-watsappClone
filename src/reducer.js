// initailState represents how the dataLayer Looks (we start with user not being logged in)
export const initialState = {
  user: null, // turn this off (to string or any value to use without logging)
};

export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  console.log("action from reducer.js", action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
