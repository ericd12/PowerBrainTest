import React from 'react';


const ElemData = ({info, slideNumber}) => {
    const {elementNumber, 
        elementLabel,
        elementDuration,
        elementLink} = info
    return (
        <tr>
            <td>
                {slideNumber + 1}
            </td>
            <td >
                {elementNumber}
            </td>
            <td >
                {elementLabel}
            </td>
            <td >
                {elementDuration}
            </td>
            <td >
                {elementLink}
            </td>
        </tr>
    );
}
 
export default ElemData;