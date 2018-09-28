const prettier = require('prettier');
module.exports = {
  Init: function(){
    
    let template = `
    const initialState = {
      loading: true,
      error: null 
    }

    export default function(state=initialState, action={}){
      switch(action.type){
        case 'PENDING' :
          return {
            ...state
          }
        case 'SUCCESS' :
          return {
            ...state
          }
        case 'FAILURE' :
          return {
            ...state
          }
        default:
          return {
            ...state
          }
      }
    }
    `;

    let res = prettier.format(template);

    return res;
  }
}