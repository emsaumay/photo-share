import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
    switch(action.type){
        case "CHANGE_INPUT":
            let formValid = true
            for(const inputId in state.inputs){
                if(!state.inputs[inputId]){
                    continue;
                }
                if(inputId === action.id){
                    formValid = formValid && action.isValid
                }
                else{
                    formValid = formValid && state.inputs[inputId].isValid
                }
            }
            return{
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.id]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isValid: formValid
            }
        case "SET_DATA":
            return{
                inputs: action.inputs,
                isValid: action.formValid
            }
        default:
            return state
    }
}

export const useForm = (initialInputs, InitialValid) =>{
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: InitialValid
    })

    const InputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: "CHANGE_INPUT",
            value: value,
            id: id,
            isValid: isValid
        })
    }, [])

    const setFormValue = useCallback((inputData, formValidity) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            formValid: formValidity
        })
    }, [])

    return [formState, InputHandler, setFormValue]
}
