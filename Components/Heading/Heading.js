import React from 'react';
import { getLevelForHeader, getTextAlign } from '../../utils/fonts';

export const Heading = ({textAlign, content, level = 2}) => {
    const tag = React.createElement(`h${level}`,{
        className : `font-heading max-w-5xl mx-auto my-5 ${getTextAlign(textAlign)} ${getLevelForHeader(level)}`,
        dangerouslySetInnerHTML : {__html : content}
    })



    return tag;
}