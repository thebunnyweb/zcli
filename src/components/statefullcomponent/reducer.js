const initialState = {
  loading: true,
  error: null
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case "PENDING":
      return {
        ...state
      };
    case "SUCCESS":
      return {
        ...state
      };
    case "FAILURE":
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
}
