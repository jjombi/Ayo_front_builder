import React from "react";
import { useSearchParams } from "react-router-dom";
import Header from '../ayo_world_rank_header';
import queze_types  from '../../public/Guide_basic/queze_types.png';

// import quezeshosw_type from '../Img_folder/quezshow_type.png';
// import queze1 from '../Img_folder/queze_queze.png';
// import queze2 from '../Img_folder/queze_queze2.png';
// import text_img from '../Img_folder/text.png';
// import vote from '../Img_folder/vote.png';
// import queze_type from '../Img_folder/queze_type.png';
const Guide_basic = ({text}) => {
    const [seachParams, setSearchParams] = useSearchParams();
    const type = seachParams.get('type');
    return(
    <>  
        <Header></Header>
        <section className="Guide_basic_root">
            <h1>
                퀴즈쇼 제작 방법
            </h1>
            <section className="Guide_basic_content">
                {
                    type === '1'
                    ?
                    <>
                    <p>
                        1. 퀴즈쇼 제작 페이지에 들어간 후 상단에 있는 (퀴즈쇼 제작)버튼을 누릅니다.
                    </p>
                    <p>
                        (로그인 없이 제작 가능 합니다. 다만 로그인 없이 퀴즈를 제작할 경우 자신이 만든 퀴즈를 따로 불러올 수 없습니다,
                    </p>
                    <p>
                        또한 퀴즈를 수정하기 위해 서는 퀴즈 제작후 받은 비밀번호를 입력하여 퀴즈를 수정할 수 있습니다)
                    </p>
                    <p>
                        2. 퀴즈쇼는 크게 3가지 종류로 만들 수 있습니다
                    </p>
                    <img src={queze_types}></img>
                    <p>
                        첫째 투표 형식, 제작자가 여러 선택지를 재공하고 사용자는 선택지 중 하나를 선택해 투표할 수 있습니다
                    </p>
                    <br/>
                    {/* <img src={''}></img> */}
                    <p>
                        둘째 객관식 퀴즈 형식, 제작자가 여러가지 선택지를 제공 하고 사용자는 선택지 중 하나를 선택할 수 있습니다
                    </p>
                    <br/>
                    {/* <img src={''}></img> */}
                    <p>
                        셋째 서술형 퀴즈 형식, 제작자가 정답인정 범위를 입력하고 사용자는 정답에 맞는 글을 작성할 수 있습니다
                    </p>
                    <br/>
                    <p>
                        객관식 문제는 유저가 선택지를 버튼으로 눌러 정답을 맞출 수 있습니다
                    </p>
                    {/* <img src={''}></img> */}
                    <p>
                        서술형 문제는 유저가 답을 입력하여 정답을 맞출 수 있습니다
                    </p>
                    {/* <img src={''}></img> */}
                    <p>
                        세번째 문장 형식은 문자로만 이루어진 문제를 보고 유저가 답을 입력하여 정답을 맞출 수 있습니다.
                    </p>
                    {/* <img src={''}></img> */}
                    </>
                    :
                    <p>22222222222222222222222222222222</p>
                }
                {/* <div>

                </div> */}
            </section>
        </section>
    </>
    )
}
export default Guide_basic;