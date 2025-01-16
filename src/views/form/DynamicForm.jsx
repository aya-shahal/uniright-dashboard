import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "reactstrap";
import {Utilites} from "../../core/Utilites";

const DynamicForm = ({ fillAttribute,initialdata,colx }) => {
    const [columns, setColumns] = useState([]);
    const [generating, setGenerating] = useState(true);
    const [readOnly, setReadOnly] = useState(true);
    const [rows, setRows] = useState(0);
    const [rowsData, setRowsData] = useState([]);
    const [modified, setModified] = useState(false);

    useEffect(() => {
        setGenerating(false);
    }, [])

    useEffect(() => {
        processCol();
    }, [colx])

    useEffect(() => {

    }, [columns])

    const processCol = () => {
        let headcol = [];
        colx && colx.map(x=>{
            headcol.push({name:Utilites.slug(x.name?x.name:x.label),label:x.name?x.name:x.label})
        })
        headcol.push({name:"name",label:"Question"})
        headcol.push({name:"type",label:"Question type"})
        headcol.push({name:"value",label:"value"})
        setColumns(headcol)

        fillold(headcol);
    };
    const handleChange = (e, index, index2) => {
        const fields = rowsData[index].map((r, j) => (j === index2 ? e : r));
        setRowsData(rowsData.map((rw, i) => (i === index ? fields : rw)));
    };

    const fillold=(headcol)=>{
        setModified(true);
        initialdata.map(x=>{
            setRows((prevRows) => prevRows + 1);
            let array = [];
            for (let i = 0; i < headcol.length; i++) {
                array.push(x[headcol[i].name]);
            }
            setRowsData((prevRowsData) => [...prevRowsData, array]);
        })
    }

    const addRow = () => {
        setModified(true);
        setRows((prevRows) => prevRows + 1);
        let array = [""];
        for (let i = 1; i < columns.length; i++) {
            array.push("");
        }
        setRowsData((prevRowsData) => [...prevRowsData, array]);
    };

    const deleteRow = (index) => {
        setModified(true);
        setRows((prevRows) => prevRows - 1);
        setRowsData((prevRowsData) => prevRowsData.filter((row, i) => i !== index));
    };


    useEffect(() => {
        const data = [];
        rowsData.map((row, index) => {
            const obj = { sno: index + 1 };
            columns.map((col, i) => {
                obj[col.name] = row[i];
            });
            data.push(obj);
        });
        fillAttribute(data)
    }, [rowsData]);

    return (
        <div >
            <Row className=" mb-3">
                <Col
                    md={12}
                    className="d-flex align-items-center justify-content-end"
                    style={{ marginLeft: "auto", marginRight: "70px" }}
                >
                    <span className="mr-2">total: {rows} </span>&nbsp;&nbsp;
                    <Button type="button" onClick={addRow} variant="outline-dark">
                        Add
                    </Button>
                    &nbsp;&nbsp;

                    &nbsp;&nbsp;

                </Col>
            </Row>
            <Row>
                <Col md={12} >
                    {!generating ? (
                        <>
                            <Table responsive className=" h-100">
                                <thead>
                                <tr>
                                    <th></th>
                                    {columns.map((col, index) => (
                                        <th key={index + 999999}>

                                        </th>
                                    ))}
                                    <th></th>
                                </tr>
                                <tr className="bg-dark text-white">
                                    <th
                                        scope="col"
                                        className="d-flex align-items-center justify-content-center py-3 pb-2 border-0"
                                    >
                                        #
                                    </th>
                                    {columns.map((col, index) => (
                                        <th key={index} scope="col">
                                            <input
                                                type="text"
                                                className="form-control border-0 text-center bg-dark text-white"
                                                style={{ outline: "none", boxShadow: "none" }}
                                                readOnly={readOnly}
                                                onFocus={() => setReadOnly(false)}
                                                onBlur={() => setReadOnly(true)}
                                                value={col.label}
                                                onChange={(e) =>
                                                    setColumns(
                                                        columns.map((coln, id) =>
                                                            id === index ? e.target.value : coln.name
                                                        )
                                                    )
                                                }
                                            />
                                        </th>
                                    ))}
                                    <th className="text-center">

                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {rowsData.length > 0 ? (
                                    <>
                                        {rowsData.map((data, index) => (
                                            <tr key={index + 5}>
                                                <td className="text-center">{index + 1}</td>
                                                {data.map((row, index2) => (

                                                    <td key={index2 + 988}>
                                                        {index2===1?<select  className="form-control text-center" name="type" id="type"
                                                                             onChange={(e) =>
                                                                                 handleChange(e.target.value, index, index2)
                                                                             }>
                                                            <option value="text" selected={rowsData[index][index2]=="text" || rowsData[index][index2]==""}>text</option>
                                                            <option value="dropdown" selected={rowsData[index][index2]=="dropdown"} >Options</option>
                                                            <option value="switch" selected={rowsData[index][index2]=="switch"}>Yes/No</option>
                                                        </select>:<input
                                                            type={"text"}
                                                            className="form-control text-center"
                                                            placeholder={`Enter field`}
                                                            value={rowsData[index][index2]}
                                                            onChange={(e) =>
                                                                handleChange(e.target.value, index, index2)
                                                            }
                                                        />}
                                                    </td>
                                                ))}
                                                <td className="text-center">
                                                    <Button
                                                        type="button"
                                                        onClick={() => deleteRow(index)}
                                                        variant={"outline-danger"}
                                                        size="sm"
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <tr>
                                            <th
                                                className="text-center py-3"
                                                colSpan={columns.length + 2}
                                            >
                                                Please click on Add Button to add a Answer
                                            </th>
                                        </tr>

                                    </>
                                )}
                                </tbody>
                            </Table>
                        </>
                    ) : (
                        <h1 className="text-center my-5">Generating...</h1>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default DynamicForm;
