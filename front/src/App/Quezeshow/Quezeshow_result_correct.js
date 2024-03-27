import React from "react";

const Quezeshow_result_correct = ({all_queze_num, correct_all_queze_num, setCorrect_queze_checker, setShow_index, setClicked, setCorrect, setQueze_is_done_state}) => {
    const replay = () => {
        const correct_ = {is : false, answer : null}
        const queze_is_done_state_ = {tinyint : false, count : null};
        setCorrect_queze_checker(correct_queze_checker => []);
        setShow_index(show_index => 0);
        setClicked(clicked => null);
        setCorrect(correct => correct_);
        setQueze_is_done_state(queze_is_done_state => queze_is_done_state_);
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