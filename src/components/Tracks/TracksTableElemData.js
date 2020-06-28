import React from 'react';


const ElemData = ({ elementNumber,
    elementLabel,
    elementDuration,
    elementLink, slideNumber}) => {

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