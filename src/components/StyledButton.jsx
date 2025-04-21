import React from 'react';
import { useTheme } from '../context/ThemeContext';

const StyledButton = ({ children, onClick, disabled, style }) => {
  const { isDarkMode } = useTheme();

  return (
    <button
      className="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style
      }}
    >
      <span className="button_lg">
        <span className="button_sl"></span>
        <span className="button_text">{children}</span>
      </span>

      <style>
        {`
          .button {
            -moz-appearance: none;
            -webkit-appearance: none;
            appearance: none;
            border: none;
            background: none;
            color: ${isDarkMode ? '#fff' : '#0f1923'};
            cursor: pointer;
            position: relative;
            padding: 8px;
            margin-bottom: 20px;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 14px;
            transition: all .15s ease;
          }

          .button::before,
          .button::after {
            content: '';
            display: block;
            position: absolute;
            right: 0;
            left: 0;
            height: calc(50% - 5px);
            border: 1px solid ${isDarkMode ? '#7D8082' : '#0f1923'};
            transition: all .15s ease;
          }

          .button::before {
            top: 0;
            border-bottom-width: 0;
          }

          .button::after {
            bottom: 0;
            border-top-width: 0;
          }

          .button:active::before,
          .button:active::after {
            right: 3px;
            left: 3px;
          }

          .button:active::before {
            top: 3px;
          }

          .button:active::after {
            bottom: 3px;
          }

          .button_lg {
            position: relative;
            display: block;
            padding: 10px 20px;
            color: ${isDarkMode ? '#0f1923' : '#fff'};
            background-color: ${isDarkMode ? '#fff' : '#0f1923'};
            overflow: hidden;
            box-shadow: inset 0px 0px 0px 1px transparent;
          }

          .button_lg::before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 2px;
            height: 2px;
            background-color: ${isDarkMode ? '#fff' : '#0f1923'};
          }

          .button_lg::after {
            content: '';
            display: block;
            position: absolute;
            right: 0;
            bottom: 0;
            width: 4px;
            height: 4px;
            background-color: ${isDarkMode ? '#fff' : '#0f1923'};
            transition: all .2s ease;
          }

          .button_sl {
            display: block;
            position: absolute;
            top: 0;
            bottom: -1px;
            left: -8px;
            width: 0;
            background-color: #ff4655;
            transform: skew(-15deg);
            transition: all .2s ease;
          }

          .button_text {
            position: relative;
          }

          .button:hover {
            color: ${isDarkMode ? '#0f1923' : '#0f1923'};
          }

          .button:hover .button_sl {
            width: calc(100% + 15px);
          }

          .button:hover .button_lg::after {
            background-color: ${isDarkMode ? '#0f1923' : '#fff'};
          }
        `}
      </style>
    </button>
  );
};

export default StyledButton;
