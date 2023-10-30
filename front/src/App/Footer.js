import React from 'react';
import Svg_bug from '/src/App/Img_folder/Bug_light.svg';

const Footer = () => {


    return(
        <footer>
            개발자 : 이재건
            2023
            <a href="mailto:dlworjs6@dgsw.hs.kr?subject=버그 제보" className='bug' title='버그 제보'>
                <Svg_bug/>
            </a>
        </footer>
    )
}

export default Footer;