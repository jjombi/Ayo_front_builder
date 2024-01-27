import React from "react";
import Make_quezeshow_basic from "../Quezeshow/Make_quezeshow_basic";
import { useSearchParams } from "react-router-dom";

const Make_space_quezeshow = () => {
    const [seachParams, setSearchParams] = useSearchParams();
    const space_uuid = seachParams.get('space_uuid');
    const space_title = seachParams.get('space_title');
    return(
        <Make_quezeshow_basic space_uuid={space_uuid} make_quezeshow_type={'space'} space_title={space_title} server_url={'make_spacequezeshow'}/>
    )    
}
export default Make_space_quezeshow;