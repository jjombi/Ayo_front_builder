import React from 'react';
import Svg_bug from '/src/App/Img_folder/Bug_light.svg';
import Adfit from './Adfit';

const Footer = () => {


    return(
        <footer>
            <div>
                {/* 개발자 : 이재건
                2023 */}
                <p> 버그 제보(이매일로 이동) </p>
                <a href="mailto:dlworjs6@dgsw.hs.kr?subject=버그 제보" className='bug' title='버그 제보'>
                    <Svg_bug/>
                </a>
            </div>
            <div>
                <li>
                    <ul>이상형 월드컵 seasen2, 내 이상형 순위를 선택해 보세요!</ul>
                </li>
            </div>
            <Adfit unit={'DAN-87ortfszgGZjj16M'}></Adfit>
        </footer>
    )
}

export default Footer;