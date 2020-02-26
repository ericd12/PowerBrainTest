import React from 'react'
import '../../App.css';




function Board(props) {
    const drop = (e) => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');
        const card = document.getElementById(card_id);
        card.style.display = 'block';

        e.target.appendChild(card);
    }

    const dragOver = (e) => {
        e.preventDefault();
        
    }

    return(
        <div
            id={props.id}
            className={props.className}
            onDrop={drop}
            onDragOver={dragOver}            
        > 
            <table className="table" >
                <thead className="thead-light" >
                    <tr id='board'>
                        <th>Number</th>
                        <th>Label</th>
                        <th>Description</th>
                        <th>Format</th>
                        <th>Duration</th>
                        <th>Category</th>
                        <th>Subcategory</th>
                        <th>Market</th>
                        <th>Cognitive Rating</th>
                        <th>Physical Rating</th>
                        <th>Vimeo Link</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
                {props.children}    
      
        </div>
    )
}

export default Board