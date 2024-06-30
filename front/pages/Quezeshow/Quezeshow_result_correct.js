import React, { useEffect } from "react";
import {isLogin} from '../../functions/WorldRank';
import { customAxiosGet } from "../../functions/Custom_axios/Custom_axios";
const Quezeshow_result_correct = ({uuid,all_queze_num, correct_all_queze_num, setShow_index, setClicked, setCorrect_state, setCorrect_count, resetContent_state, correct_count}) => {
    const replay = () => {
        console.log('replay');
        const correct_ = {queze_state : false, is_correct : null};
        setShow_index(show_index => 0);
        setClicked(clicked => null);
        setCorrect_state(correct => correct_);
        setCorrect_count(correct_count => 0);
        resetContent_state();
    }

    const useeffectFunc = () => {
        if(isLogin){
            customAxiosGet({
                url : '/queze_rank_check',
                params : {
                    // correct_count,
                    uuid,
                    // userEmail : getUserEmailKey()
                }
            }).then(res=>{
                let rank;
                if(res.data.length === 0) rank = 1;
                else{
                    res.data.map((e,i)=>{
                        console.log('asdge;g',e);
                        if(correct_count > e.value) rank = e.number;
                        else rank = e.number+1
                    })
                }
                console.log('rank is :',rank);
            })
        }
    }

    useEffect(()=>{useeffectFunc()},[]);

    return(
        <section className="Quezeshow_result_correct_root">
            <h1>{all_queze_num}문제 중 {correct_all_queze_num}문제 정답</h1>
            <h1>{Math.floor(correct_all_queze_num / all_queze_num * 100)}점</h1>
            <button className="all_btn" onClick={replay}>다시하기</button>
        </section>
    )
}

export default  Quezeshow_result_correct;