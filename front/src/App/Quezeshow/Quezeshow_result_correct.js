import React from "react";

const Quezeshow_result_correct = ({all_queze_num, correct_all_queze_num, setShow_index, setClicked, setCorrect_state}) => {
    const replay = () => {
        const correct_ = {queze_state : false, is_correct : null};
        setShow_index(show_index => 0);
        setClicked(clicked => null);
        setCorrect_state(correct => correct_);
    }
    return(
        <section className="Quezeshow_result_correct_root">
            <h1>{all_queze_num}문제 중 {correct_all_queze_num}문제 정답</h1>
            <h1>{Math.floor(correct_all_queze_num / all_queze_num * 100)}점</h1>
            <button className="all_btn" onClick={replay}>다시하기</button>
        </section>
    )
}

export default  Quezeshow_result_correct;