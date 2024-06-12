import React, { useState } from "react";
import Header from "../../ayo_world_rank_header";
import '../../css.css';
import { useNavigate } from "react-router-dom";
import Waiting_popup from "./Waiting_popup";

const Break_egg = ({}) => {
    const navigate = useNavigate();
    const [waitting_player_popup, setWaitting_player_popup] = useState({
        tinyInt : false,
        data    : null
    });
    const unlock = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 13.0002C4 11.1146 4 10.1718 4.58579 9.58603C5.17157 9.00024 6.11438 9.00024 8 9.00024H16C17.8856 9.00024 18.8284 9.00024 19.4142 9.58603C20 10.1718 20 11.1146 20 13.0002V15.0002C20 17.8287 20 19.2429 19.1213 20.1216C18.2426 21.0002 16.8284 21.0002 14 21.0002H10C7.17157 21.0002 5.75736 21.0002 4.87868 20.1216C4 19.2429 4 17.8287 4 15.0002V13.0002Z" stroke="white"/>
    <path d="M16.4999 9.00006L16.5775 8.37947C16.8364 6.30788 15.9043 4.2675 14.1688 3.10709V3.10709C12.1023 1.72543 9.36726 1.89573 7.48819 3.52305L6.66986 4.23174" stroke="white" stroke-linecap="round"/>
    <circle cx="12" cy="15" r="2" fill="white"/>
    </svg>
    )
    const join_the_game = (e) => {
        // navigate('/egg/game',{state:{uuid : e.target.id}});
        const waitting_player_popup_={
            tinyInt : !waitting_player_popup.tinyInt,
            data    : e.target.id
        }
        setWaitting_player_popup(waitting_player_popup => waitting_player_popup_);
    }
    return(
        <section className="Break_egg_root">
            <Header></Header>
            {
                waitting_player_popup.tinyInt
                ?
                <Waiting_popup uuid={waitting_player_popup.data}/>
                :null
            }
            <header className="Main2_a_queze_header">
                <button type="button" title="수정하기." className="all_btn a_queze_header_btn" >
                    방 만들기
                </button>
            </header>
            <section className="break_egg_content_header">

            </section>
            <section className="break_egg_content">
                <div>
                    <p>방1 sadfasafafa</p>
                    {unlock}
                    <button id={'test_room'} className="all_btn" onClick={join_the_game}>입장하기</button>
                </div>
                <div>
                    <p>방2</p>
                    {unlock}                    
                    <button className="all_btn">입장하기</button>
                </div>
            </section>
        </section>
    )
}
export default Break_egg;

// 버튼 세개, 덮개 치기, 덮개 들기, 도마 치기,
// 덮개가 덮여있으면 덮개를 치거나, 들수 있음
// 덮게가 들려있으면 도마쳐야함
// 위 경우에 벗어나면 탈락 