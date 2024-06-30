import React from 'react';

const Explain_popup = ({text, top, left}) => {
    return (
        <div className='explain_popup_root' style={{top : top, left : left}}>
            <p>{text}</p>
        </div>
    )
}

export default Explain_popup;