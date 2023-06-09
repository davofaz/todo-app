import React from 'react';

const Instructions: React.FC = () => {
    return (
        <div style={{ textAlign: 'left' }}>
            <h2>Instructions</h2>
            <ol>
                <li>Add some todos</li>
                <li>Edit by double clicking/tapping</li>
                <li>Drag to change the order</li>
                <li>Delete, mark as important and tick when complete using the icons</li>
            </ol>
        </div>
    )
}

export default Instructions;