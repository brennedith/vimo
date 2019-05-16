import React from 'react';

const TextArea = ({ value, onChange }) => (
  <textarea
    className="textarea"
    value={value}
    onChange={onChange}
    style={{ maxHeight: '100000px', flex: '0 0 90%' }}
  />
);

export default TextArea;
