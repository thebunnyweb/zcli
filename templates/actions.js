const prettier = require('prettier');
module.exports = {
  Init: function(actionName, actionType){
    
    let actionTypeLower = actionType.split('_').join('').toString().toLowerCase();
    let template = `
    import React from 'React';

    export const ${actionType}_PENDING = '${actionType}_PENDING';
    export const ${actionType}_SUCCESS = '${actionType}_SUCCESS';
    export const ${actionType}_FAILURE = '${actionType}_FAILURE'; 

    export function ${actionTypeLower}pending(){
      return dispatch => {
        dispatch({type: ${actionType}_PENDING }) 
        // Add Api interactivity here
      }
    }

    export function ${actionTypeLower}success(payload){
      return dispatch => {
        dispatch({type: ${actionType}_SUCCESS, payload }) 
      }
    }

    export function ${actionTypeLower}failue(payload){
      return dispatch => {
        dispatch({type: ${actionType}_FAILURE, payload }) 
      }
    }

    `;

    let res = prettier.format(template);

    return res;
  }
}