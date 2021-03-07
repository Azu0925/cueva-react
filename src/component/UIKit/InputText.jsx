import React from 'react';
import TextField from '@material-ui/core/TextField';

const InputText = (props) => {

return(
    //propsの意味はMaterial-UIのcomponent>TextFieldを参考にしてください。https://material-ui.com/
    <TextField
            fullWidth={props.fullWidth}
            label={props.label}
            margin="dense"
            multiline={props.multiline}
            required={props.required}
            rows={props.rows}
            value={props.value}
            type={props.type}
            variant={props.variant}
            defaultValue={props.defaultValue}
            autoFocus={props.autoFocus}
            disabled={props.disabled}
            InputLabelProps={{
                shrink: props.shrink,
              }}
            onChange={props.onChange}
            onKeyDown={props.onKeyDown}
            onBlur={props.onBlur}
            className={props.className}
            
        />
)

}

export default InputText;