import React, { useState, useEffect } from 'react';

import './TextArea.css';

const textStyles = [
  //TODO: Add styles
  { background: 'red', color: 'white', fontFamily: 'Arial' },
  { background: 'white', color: 'red', fontFamily: 'Times New Roman' }
];

const TextArea = ({ handleSend }) => {
  const [styleIndex, setStyleIndex] = useState(0);
  const [style, setStyle] = useState(null);
  const [content, setContent] = useState(`What's on your mind? 😎️`);

  const contentMaxLength = 500;
  const fontSize = 4 - 2.8 * (content.length / contentMaxLength) + 'em';

  useEffect(() => {
    const style = textStyles[styleIndex];
    setStyle(style);
  }, [styleIndex]);

  const cycleStyles = () => {
    //TODO: Textarea should not lose focus (or hide controls while editing)
    setStyleIndex((styleIndex + 1) % textStyles.length);
  };

  const sendContent = () => {
    const bodyContent = {
      type: 'text',
      content,
      style: {
        ...style,
        fontSize
      }
    };

    handleSend(bodyContent);
  };

  return (
    <>
      <textarea
        className="textarea-post"
        value={content}
        maxLength={contentMaxLength}
        autoFocus
        style={{ ...style, fontSize }}
        onChange={({ target }) => setContent(target.value)}
      />
      <div className="controls">
        <div className="styles" />
        <button type="button" className="send" onClick={sendContent}>
          Send
          <br />
          VIMO
        </button>
        <button
          type="button"
          className="styles text"
          style={style}
          onClick={cycleStyles}
        >
          A
        </button>
      </div>
    </>
  );
};

export default TextArea;
