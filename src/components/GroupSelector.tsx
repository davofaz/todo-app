import React, { useEffect, useState } from 'react';
import { FiCircle } from 'react-icons/fi';

type GroupSelectorProps = {
    todoId: string;
    selectedColor: string;
    handleColorSelect: (id: string, color: string) => void;
};

const GroupSelector: React.FC<GroupSelectorProps> = ({
    todoId,
    selectedColor,
    handleColorSelect,
}) => {
    const [darkenedColor, setDarkenedColor] = useState('');

    useEffect(() => {
        // Calculate the darker color
        const darkenAmount = 0.8; // Adjust this value to control the darkness
        const rgbColor = hexToRgb(selectedColor);

        if (rgbColor) {
            const darkerColor = `rgb(${rgbColor.r * darkenAmount}, ${rgbColor.g * darkenAmount}, ${rgbColor.b * darkenAmount})`;
            setDarkenedColor(darkerColor);
        }
    }, [selectedColor]);

    // Helper function to convert hex color to RGB
    const hexToRgb = (hex: string) => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        const fullHexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
        const result = fullHexRegex.exec(hex) || shorthandRegex.exec(hex);

        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            }
            : null;
    };

    const colors = ['white', '#00997B', '#C23079', '#A1BADD'];

    return (
        <div className="group-selector" style={{ backgroundColor: selectedColor === 'white' ? '#EEEEEE' : darkenedColor, }}>
            <div className="color-options">
                {colors.map((color) => (
                    <FiCircle
                        key={color}
                        className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                        style={{ stroke: color, color: color }}
                        onClick={() => handleColorSelect(todoId, color)}
                    />
                ))}
            </div>
        </div>
    );
};

export default GroupSelector;
