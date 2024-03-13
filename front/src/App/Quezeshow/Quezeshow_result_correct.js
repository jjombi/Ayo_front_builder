import React from "react";

const Quezeshow_result_correct = ({all_queze_num, correct_all_queze_num}) => {

    return(
        <section className="Quezeshow_result_correct_root">
            <h1>{all_queze_num}문제 중 {correct_all_queze_num}문제 정답</h1>
            <h1>{correct_all_queze_num / all_queze_num * 100}점</h1>
        </section>
    )
}

export default  Quezeshow_result_correct;