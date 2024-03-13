import React from "react";
import { useSearchParams } from "react-router-dom";
import '../css.css'
import Header from '../ayo_world_rank_header';
import quezeshosw_type from '../Img_folder/quezshow_type.png';
import queze1 from '../Img_folder/queze_queze.png';
import queze2 from '../Img_folder/queze_queze2.png';
import text_img from '../Img_folder/text.png';
import vote from '../Img_folder/vote.png';
import queze_type from '../Img_folder/queze_type.png';
const Guide_basic = ({text}) => {
    const [seachParams, setSearchParams] = useSearchParams();
    const type = seachParams.get('type');
    return(
    <>  
        <Header></Header>
        <section className="Guide_basic_root">
            {
                type === '1'
                ?
                <>
                <h1>
                    퀴즈쇼 제작 방법
                </h1>
                <p>
                    1. 퀴즈쇼 페이지에 들어간 후 상단 왼쪽에 있는 (퀴즈쇼 제작)버튼을 누릅니다
                </p>
                <p>
                    2. 퀴즈쇼의 제목과 어떠한 퀴즈인지 설명하는 글을 작성합니다
                </p>
                <p>
                    3. 퀴즈쇼는 크게 3가지 종류로 만들 수 있습니다
                </p>
                <img src={quezeshosw_type}></img>
                <p>
                    첫째 투표 형식, 이미지와 제목, 설명글을 작성할수 있습니다
                </p>
                <img src={vote}></img>
                <p>
                    둘째 퀴즈 형식, 퀴즈형식은 객곽신 서술형으로 선택해 제작할 수 있습니다
                </p>
                <img src={queze_type}></img>
                <p>
                    공통 적으로 이미지와 제목, 설명글을 작성 할 수 있고, 
                </p>
                <p>
                    객관식 문제는 유저가 선택지를 버튼으로 눌러 정답을 맞출 수 있습니다
                </p>
                <img src={queze1}></img>
                <p>
                    서술형 문제는 유저가 답을 입력하여 정답을 맞출 수 있습니다
                </p>
                <img src={queze2}></img>
                <p>
                    세번째 문장 형식은 문자로만 이루어진 문제를 보고 유저가 답을 입력하여 정답을 맞출 수 있습니다.
                </p>
                <img src={text_img}></img>
                </>
                :
                <p>22222222222222222222222222222222</p>
            }
            <div>

            </div>
        </section>
    </>
    )
}
export default Guide_basic;