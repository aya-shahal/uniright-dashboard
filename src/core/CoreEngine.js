import React, { Component } from "react";
import { OrbitSpinner } from 'react-epic-spinners'

class CoreEngine extends Component {

    componentWillMount() {
        let isloggedin = sessionStorage.getItem('isloggedin');
        if(!isloggedin || isloggedin === "false"){
            this.props.history.push('/auth/login');
        }
    }

    putrowstatus(item){
        if(item.status === 0){
            return "Pending"
        }else if(item.status === 1){
            return "Activated"
        }
    }

    changeInput = (event, stateName) => {
        if(!event){
            this.setState({ [stateName]: "" });
        }else
        if(event && event.target){
            this.setState({ [stateName]: event.target.value });
        }else if(event && event.length){
            this.setState({ [stateName]: event });
        }else{
            this.setState({ [stateName]: event.value }); // select input
        }
    };

    changeInputOne = (event, stateName) => {
        if(!event){
            this.setState({ [stateName]: "" });
        }else
        if(event && event.target){
            this.setState({ [stateName]: event.target.value });
        }else{
            this.setState({ [stateName]: event.value }); // select input
        }
    };


     convertToSlug(Text,slug='-'){
        return Text.trim()
            .toLowerCase()
            .replace(/[^\w ]+/g,'')
            .replace(/ +/g,slug)
            ;
    }
    createSelectValue(array,withslug=false){
        let data = [];
        array.map((item)=>{
            if(item.length<2){

            }else{
                if(withslug){
                    data.push({ value: this.convertToSlug(item,"xx"), label: item.trim() })
                }else{
                    data.push({ value: item.trim().toLowerCase(), label: item.trim().toLowerCase() })
                }
            }


        });
        return data;
    };

     formatDate =(date)=> {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }



    filterCaseInsensitive(filter, row) {
        const id = filter.pivotId || filter.id;
        return (
            row[id] !== undefined ?
                String(row[id].toString().toLowerCase()).includes(filter.value.toString().toLowerCase())
                :
                true
        );
    }

    renderDateFromTimeStamp(timestamp) {
        let moment = require('moment');
        const formatted = moment.unix(timestamp/1000).format("DD/MM/YYYY HH:mm");
        return <span>
            {formatted}
        </span>
    }

    renderDate(item) {
        if(!item){
            return "-"
        }
        let moment = require('moment');

        let obj = moment(item).utcOffset(item)

       // const newdate = obj.format('DD/MM/YYYY HH:mm')
        const newdate = obj.format('DD/MM/YYYY ')
        return newdate
    }

    renderProgress() {
        return (
            <div className="content">
                <div className="col-md-2 ml-auto mr-auto">

                    <div className="logo">

                        <div className="logo-img">
                            <OrbitSpinner color="#51BCDA"  className="loadingLogo" />
                        </div>

                    </div>

                </div>
            </div>
        )
    }

}

export default CoreEngine;


