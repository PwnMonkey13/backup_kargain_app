export React, {Fragment} from 'react';
export InputPhone from 'react-phone-number-input/input'
export { Input, NumberInput,TextArea } from 'linked-controls'
export { Label, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import classNames from 'classnames'
import FormGroupCustom from '../../components/form/FormGroupCustom'

/* list of supported file types */
const FileAcceptTypes = (types = []) => types.map(function(x) { return '.' + x; }).join(',');

const Switch = ({$flag, type, label, ...props} ) => {
    switch(type){
        case 'file':
            return(
                <input
                    type={type}
                    accept={FileAcceptTypes(props.types)}
                    { ...props }
                />
            );
        case 'checkbox':
            return(
                <Fragment>
                    <Label> {label}
                        <Input
                            type={type}
                            $checked={ $flag.equals(true)}
                            { ...props }
                        />
                    </Label>
                </Fragment>
            );
            case 'radio':
                return(
                    <Input
                        type={type}
                        $checked={ $flag.equals(true)}
                        { ...props }
                    />
                );
            case 'tel':
                return(
                    <InputPhone country="FR"
                                $value={$flag.value}
                                { ...props } />
                );
            case 'textarea' :
                return(
                    <TextArea
                        rows={props.rows || 10}
                        $value={$flag}
                        { ...props } />
                );
            case 'number':
                return(
                    <NumberInput
                        $value={$flag}
                        integer={props.integer || true}
                        positive={props.positive || true}
                        { ...props }
                    />
                );
            default :
                return(
                    <Input
                        type={type}
                        $value={$flag}
                        { ...props }
                    />
                )
        }
};

const InputControlled = (props) => {

    const {
        classes,
        inline, col, row,
        prepend,
        append,
        type,
        $flag,
        ...rest } = props;

    const display = { inline, col, row };
    const classnames = classNames({
        'error' : $flag.error,
        classes
    });

    return(
        <FormGroupCustom {...display} className={classnames}>
            {type !== 'checkbox' && props.label && <Label> {props.label}  </Label> }
            {prepend || append ? (
                <InputGroup>
                    { prepend && <InputGroupAddon addonType="prepend">
                        <InputGroupText>{prepend}</InputGroupText>
                    </InputGroupAddon> }
                    <Switch $flag={$flag} type={type || 'text' } {...rest} />
                    { append && <InputGroupAddon addonType="append">
                        <InputGroupText>{append}</InputGroupText>
                    </InputGroupAddon> }
                </InputGroup>
                ) :
                <Switch $flag={$flag} type={type} {...rest} />
            }
            { $flag.error && <div className="validation-error">{ $flag.error }</div> }
        </FormGroupCustom>
    )
};

export default InputControlled
