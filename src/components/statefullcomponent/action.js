import React from "React";

export const Demo_PENDING = "Demo_PENDING";
export const Demo_SUCCESS = "Demo_SUCCESS";
export const Demo_FAILURE = "Demo_FAILURE";

export function demopending() {
  return dispatch => {
    dispatch({ type: Demo_PENDING });
    // Add Api interactivity here
  };
}

export function demosuccess(payload) {
  return dispatch => {
    dispatch({ type: Demo_SUCCESS, payload });
  };
}

export function demofailue(payload) {
  return dispatch => {
    dispatch({ type: Demo_FAILURE, payload });
  };
}
