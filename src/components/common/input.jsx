import React, { Component } from 'react';

// we can also use object destructing {{ name }} and use name everywhere instead of props.name
const Input = (props) => {
    return ( <div className="form-group col-lg-4 col-md-8 col-8 col-sm-8">
    <label htmlFor={props.name}>{props.label}</label>
    <input
      value={props.value}
      onChange={props.onChange}
      // ref={this.username}
      name={props.name}
      id={props.name}
      type={props.type}
      className="form-control"
    />

    { props.error && <div className="alert alert-danger">{props.error}</div>}
    
  </div>  );
}
 
export default Input;