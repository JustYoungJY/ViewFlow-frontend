import React from 'react';
import {Link} from 'react-router-dom'; // Предполагаем использование React Router

const catalogButton = ({
                           children,
                           primary,
                           icon,
                           to,
                           // Новый пропс: булево значение, если элемент уже в коллекции
                           isInCollection = false,
                           // Новый пропс: обработчик клика для изменения состояния
                           onClick,
                           ...props
                       }) => {

    // 1. Динамическое определение текста и иконки
    // Это применяется только для кнопки "Коллекция"
    let displayIcon = icon;
    let displayText = children;

    if (isInCollection) {
        displayIcon = "✔"; // Галочка
        displayText = "Добавлено";
    }

    // 2. Стили
    const baseClasses = "flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-semibold transition duration-200 min-w-0 whitespace-nowrap";

    // Если в коллекции, меняем цвет, чтобы показать состояние
    const colorClasses = primary
        ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
        : isInCollection
            ? "bg-green-600 hover:bg-green-700 text-white border border-green-600" // Зеленый, если добавлено
            : "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"; // Серый по умолчанию

    // 3. Выбор элемента: Link для навигации или <button> для действия
    const Component = to ? Link : 'button';

    // 4. Определение свойств
    const dynamicProps = to
        ? {to}
        : {onClick}; // Передаем обработчик клика только для кнопки-действия

    return (
        <Component
            className={`${baseClasses} ${colorClasses}`}
            {...dynamicProps}
            {...props}
        >
            {displayIcon && <span className="text-xl leading-none">{displayIcon}</span>}
            <span>{displayText}</span>
        </Component>
    );
};

export default catalogButton;