import React from "react";
import Header from "../ayo_world_rank_header";

import Make_quezeshow_basic from "./Make_quezeshow_basic";
const Make_quezeshow = () => {
    return(
        <>
            <Header></Header>
            <Make_quezeshow_basic type={'basic'} server_url={'make_quezeshow'}/>
        </>        

    )    
}
export default Make_quezeshow;