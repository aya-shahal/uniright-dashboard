import {Store} from "react-notifications-component";
export class Utilites {
    static getBaseLink(url) {
        if (url) {
            let parts = url.split('://');

            if (parts.length > 1) {
                return parts[0] + '://' + parts[1].split('/')[0] ;
            } else {
                return parts[0].split('/')[0] ;
            }
        }
        return "";
    }

    static showErrorMessage(msg){
        //alert(msg)
        Store.addNotification({
            title: "",
            message: msg,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            }
        });
    }
    static showSucessMessage(msg){
        // alert(msg)
        Store.addNotification({
            title: "",
            message: msg,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            }
        });
    }

    static getFileBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    static getInnerLink(url) {
        let baselink= Utilites.getBaseLink(url);
        let res = url.replace(baselink, "");
        if(res.length===0){
            return "/"
        }
        return res;
    }
    static validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    static converttoint(value){
        return parseInt(value);
    }
    static complexpass(password) {
        let regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
        return regExp.test(password);
    }
    static sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static YouTubeGetID = (url)=>{
        url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
    }

    static toHHMMSS = (secs) => {
        var sec_num = parseInt(secs, 10)
        var hours   = Math.floor(sec_num / 3600)
        var minutes = Math.floor(sec_num / 60) % 60
        var seconds = sec_num % 60
        return [hours,minutes,seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v,i) => v !== "00" || i > 0)
            .join(":")
    }

    static setTimeout(callMethod,seconds =400) {
        setTimeout(() => {
            callMethod();
        }, seconds);
    }
    static iterate(items){
        return items && items.map((item, index) => item.value);

    }
    static find(items,key){
        return items && items.find((item, index) => item.key === key);
    }

    static getLastElementUrl(link){
        return link.match(/([^\/]*)\/*$/)[1];
    }


}
