import {Group, FormInputLabel, Input} from './form-input.styles.jsx'

const FormInput = ({label, ...otherProps}) => {
    return (
        <Group>
        <Input {...otherProps}/>
        {
            label && (
                <FormInputLabel shrink={otherProps.value.length}>
                    {label}
                </FormInputLabel>
            )
        }
      
        
        </Group> 
    )
}

export default FormInput;

//shrink={otherProps.value.length} at Line 9 will send a true if there's a length and false if the value is 0