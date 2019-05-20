import React, { useState, useEffect } from 'react';

import PostControls from './PostControls';

import './TextArea.css';

const linearGradient = (start, stop) => {
  return `linear-gradient(135deg, ${start}, ${stop})`;
};
const textStyles = [
  { background: linearGradient('#00c3ff', '#0071ff') },
  { background: linearGradient('#ffc000', '#ff7010') },
  { background: linearGradient('#13cf18', '#20cef3') },
  { background: linearGradient('#8860fa', '#240169') },
  { background: linearGradient('#ff2f2f', '#ff8f88') }
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
      text: content,
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
      <PostControls
        handleSend={sendContent}
        rightPanel={
          <button
            type="button"
            className="round-block"
            style={style}
            onClick={cycleStyles}
          >
            A
          </button>
        }
      />
    </>
  );
};

export default TextArea;
