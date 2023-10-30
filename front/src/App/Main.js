import React,{useRef,useState} from "react";
import'./css.css';
import Svg_ from '/src/App/Img_folder/arrow_figma.svg';
import School_choose_img2 from '/src/App/Img_folder/ayo_schoolchoose_2.png'; 
import queze_img_1 from '/src/App/Img_folder/ayo_queze_1.png'; 
import make_queze_img from '/src/App/Img_folder/ayo_makequeze_1.png'

const Main = () => {
    const translate_ref = useRef(0);
    const [translate_state, setTranslate_state] = useState(0);
    const left = () => {
        if(translate_state < 0){
            setTranslate_state(translate_state + 100);
        }
    }
    const right = () => {
        if(translate_state > -300){
            setTranslate_state(translate_state - 100);
        }
    }
    return(
        <div className="Main_Main">

            <div className="Main_Main_slide">
                <ul className="Main_Main_ul">
                    <li className="Main_Main_li" style={{transform : `translateX(${translate_state}%)`}}>
                        <img src={School_choose_img2}></img>
                        <p>학교를 선택하세요</p>
                    </li>
                    <li className="Main_Main_li" style={{transform : `translateX(${translate_state}%)`}}>
                        <img src={queze_img_1}></img>
<p>                        퀴즈에 대한 자신의 생각을 말해 보세요
    </p>                    </li>
                    <li className="Main_Main_li" style={{transform : `translateX(${translate_state}%)`}}>
                        <img src={make_queze_img}></img>
                        <p>퀴즈를 자유롭게 만들고 공유해 보세요</p>
                    </li>
                    <li className="Main_Main_li" style={{transform : `translateX(${translate_state}%)`}}>
                        <img src={School_choose_img2}></img>
                        <p></p>
                        </li>
                </ul>
                <button className='btn1' onClick={left}>
                    <Svg_   className="svg_"></Svg_>
                </button>
                <button className='btn2' onClick={right}>
                    <Svg_   className="svg_2"></Svg_>
                </button>
            </div>    

        </div>
    )
}
export default Main;