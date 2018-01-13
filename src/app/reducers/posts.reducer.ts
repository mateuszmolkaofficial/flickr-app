export const posts = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'ADD_POSTS':
      return payload;
    default: 
      return state;
  }
}