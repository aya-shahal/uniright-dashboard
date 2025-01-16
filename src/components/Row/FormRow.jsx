import React       from 'react';
import PropTypes   from 'prop-types';

import {
    Label,
    FormGroup,
    Row,
    Col
} from "reactstrap";
import { AvField } from 'availity-reactstrap-validation';
import strings from "../../core/translate";

const propTypes = {
    spinColor:      PropTypes.string,
    spinConfig:     PropTypes.object,
    spinAlignment:  PropTypes.string
};

function FormRow({
                     label       = 'Label',
                     type       = 'text',
                     name = "" ,
                     viewonly=false,
                     includeRow = true,
                     required = true,
                     hidelabel = false,
                     readonly = false,
                     errorMessage = "Required",
                     helpMessage = "",
                     labelW="2",
                     formW="7",
                     data       ,
                     changeInput,
                     style={width:130}

                 }) {


    if(viewonly && data && data.length && data.length>1){

        //return ("")
    }

    /*if(label && label.includes("kurdy")){
        label = "kurdi"
    }
    if(label && !label.includes(" ")){
        debugger
        label = strings[label.toLowerCase()];
    }
    if(label && !label.includes(" ")){
        debugger
        label = strings[label];
    }*/
    if(hidelabel){

        if(viewonly){
           return <Col sm={formW} style={{    textAlign: "right",
                    padding: 10}}>
                    <FormGroup >
                        <b>{data}</b>
                    </FormGroup>

                </Col>
        }
       return  <AvField
               name={name}
               type={type} // text  or textarea
               value = {data}
               required = {false}
               readOnly = {readonly}
               errorMessage={errorMessage}
               helpMessage={helpMessage}
               style={style}
               autoComplete="none"
               onChange={e =>
                   changeInput && changeInput(e, name)
               }
           />
    }



    let output = <><Label sm={labelW}>{label}</Label>
        <Col sm={formW}>
            <FormGroup >
                <AvField
                    name={name}
                    type={type} // text  or textarea
                    value = {data}
                    required = {required}
                    readOnly = {readonly}
                    errorMessage={errorMessage}
                    helpMessage={helpMessage}
                    autoComplete="none"
                    onChange={e =>
                        changeInput && changeInput(e, name)
                    }
                />
            </FormGroup>

        </Col>

        {required && <Col className="label-on-right" tag="label" sm="3">
            <code>required</code>
        </Col>}

        </>
    if(viewonly){
         output = <><Label sm={labelW}>{label}</Label>
            <Col sm={formW} style={{    textAlign: "right",
                padding: 10}}>
                <FormGroup >
                   <b>{data}</b>
                </FormGroup>

            </Col>

            {2>3 && <Col className="label-on-right" tag="label" sm="3">
                <code>required</code>
            </Col>}

        </>
    }
    if(includeRow){
        return ( <Row>{output}</Row>);
    }
    return output;

}

FormRow.propTypes = propTypes;

export default FormRow;
