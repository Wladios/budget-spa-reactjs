import React, { Component, cloneElement } from 'react';
import './Cell.css';

let idx = 0;

export const resetIdx = () => idx = 0;

class Cell extends Component {

  constructor(props) {
    super(props);
    this._col = idx++;
  }

  render() {
    const {
      isEditing,
      editor,
      selected,
      row,
      value,
      children,
      onEdit,
      onCommit,
      ...props
    } = this.props;

    const Display = () => (
      <td
        onDoubleClick={() => onEdit(row, this._col, value)}
        {...props}
      >
        {children}
      </td>
    )
  
    const Edit = () => (
      <td>
        {cloneElement(editor, {
          onCommit
        })}
      </td>
    )

    return isEditing(this._col) ? <Edit /> : <Display />;
  }
}

export default Cell;
