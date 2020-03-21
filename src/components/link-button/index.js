import React from 'react';
import './style.less';

function LinkButton(props) {
    return (
        <button{...props} className='link-button'></button>
    )
}

export default LinkButton;