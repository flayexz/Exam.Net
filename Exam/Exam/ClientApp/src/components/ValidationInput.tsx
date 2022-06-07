import {Input} from "reactstrap";
import ValidationWithError from "../hook/validation/ValidationWithError";
import {useInput} from "../hook/input/useInput";
import FormInfo from "../hook/form/FormInfo";
import {useEffect} from "react";
import {InputType} from "reactstrap/lib/Input";

type InputValueType = string | number | readonly string[];

export interface ValidationInputProps<TForm, TInput>{
    initialValue: TInput
    validations: ValidationWithError<TInput>[];
    name: string;
    formInfo: FormInfo<TForm>;
    setFieldForm: (form: TForm, value: TInput) => void;
    typeInput: InputType;
    isRequired: boolean;
}

function ValidationInput<TForm, TInput extends InputValueType>({formInfo, ...props}: ValidationInputProps<TForm, TInput>){
    const {validationState, ...inputInfo} = useInput(props.initialValue, props.validations);
    
    function onChangeInput(e: any){
        inputInfo.onChange(e);
        props.setFieldForm(formInfo.form.current, e.target.value);
    }
    
    useEffect(() => {
         inputInfo.resetInput();
    }, [formInfo.formIsReset]);
    
    useEffect(() => {
        if (!validationState.inputIsValid){
            formInfo.setIsValid(false);
        } else {
            formInfo.checkOnValid();
        }
    }, [validationState.inputIsValid]);
    
    useEffect(() => {
        if (!validationState.inputIsValid){
            formInfo.setIsValid(false);
        }
    }, [formInfo.validationCheck])
    
    return (
        <>
            <div>{props.name}</div>
            <Input value={inputInfo.value} onChange={onChangeInput} onBlur={inputInfo.onBlur} type={props.typeInput}/>
            {inputInfo.isDirty && !validationState.inputIsValid && 
                <div className="text-danger">{validationState.errorMessage}</div>}
        </>
    );
}

export default ValidationInput;