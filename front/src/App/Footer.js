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
            <Adfit unit={'DAN-87ortfszgGZjj16M'}></Adfit>
        </footer>
    )
}

export default Footer;