import React from 'react';
import './RadioGroup.css';

export default ({
  title,
  data,
  name,
  id,
  onChange,
  required,
}) => {

  console.log(data);
  return (
    <div className="RadioGroup">
      <p>{title}  { required && <span className="required">*</span> }</p>
      <div>
        { data.map((d, i) => (
          <div key={d.value}>
            <label htmlFor={id + i}>{d.label}</label>
            <input 
              type="radio"
              id={id + i}
              value={d.value}
              name={id}
              onChange={onChange(name)}
            />
          </div>
        )) }
      </div>
    </div>
  );
}