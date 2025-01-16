import React       from 'react';

import {
    Label,
    FormGroup,
    Row,
    Col
} from "reactstrap";
import { AvField,AvInput,AvGroup } from 'availity-reactstrap-validation';



function Checkboxrow({
                     label       = 'Label',
                     name ,
                     data       ,
                     changeInput,

                 }) {


    return (
        <Row>
            <Label sm="2">{label}</Label>
            <Col sm="7">
                <FormGroup >
                        <Label check>
                            <AvInput style={{opacity:1,visibility:"visible",margin:0,position:"relative", top:2,   marginTop: 10}} type="checkbox" value = {data}  name={name} onChange={(e) =>{

                                let event = {...e}
                                if(e.target.value=="false"){
                                    event.target.value = true;
                                }else{
                                    event.target.value = false;
                                }
                                changeInput(event, name)
                            }


                            } />  &nbsp;YES
                        </Label>
                </FormGroup>

            </Col>



        </Row>
    );
}


export default Checkboxrow;
