export const initialstate = null;

export const reducer = (state = initialstate, action) => {
    switch (action.type) {
        case "USER":
            return action.payload
        default:
            return state
    }
}