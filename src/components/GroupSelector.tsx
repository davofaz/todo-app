import React from 'react';

type GroupSelectorProps = {
    todoId: string;
    selectedColor: string;
    handleGroupOpen: (id: string) => void;
    handleColorSelect: (id: string, color: string) => void;
};

const GroupSelector: React.FC<GroupSelectorProps> = ({
    todoId,
    selectedColor,
    handleGroupOpen,
    handleColorSelect,
}) => {
    const colors = ['red', 'blue', 'green', 'yellow'];

    return (
        <div className="group-selector">
            <div className="color-options">
                {colors.map((color) => (
                    <div
                        key={color}
                        className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelect(todoId, color)}
                    ></div>
                ))}
            </div>
            <div className="group-button" onClick={() => handleGroupOpen(todoId)}>
                [x]
            </div>
        </div>
    );
};

export default GroupSelector;
