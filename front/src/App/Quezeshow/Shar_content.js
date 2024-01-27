import React from "react";
import axios from "axios";
const Shar_content = ({uuid,title}) => {

    const shar_submit = () => {
        axios({
            url : process.env.REACT_APP_SERVER_URL + '/shar_quezeshow',
            method : 'POST',
            headers : {
                'Content-Type' : 'applicatioin/json'
            },
            data : {
                uuid : uuid
            }
        }).then((res)=>{
            console.log(res);
            
        })
    }

    return(
        <button onClick={shar_submit}>
            <p>{title}</p>
        </button>
    )
}
export default Shar_content;