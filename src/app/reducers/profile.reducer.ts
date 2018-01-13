export const profiles = (state: any = [], {type, payload}) => {
    switch (type) {
        case 'ADD_PROFILES':
            return payload;
        default: 
            return state;
    }
}