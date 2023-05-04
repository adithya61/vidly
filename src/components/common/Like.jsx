import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import React from 'react';

const Like = ({liked, onClick}) => {
    let heart = liked ? <AiFillHeart/> : <AiOutlineHeart/>;
        return <span style={{cursor: 'pointer'}} onClick={onClick} > {heart} </span> ;
}

export default Like;