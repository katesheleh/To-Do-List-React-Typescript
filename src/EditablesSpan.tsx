import React, { useState, ChangeEvent } from 'react';


type EditableSpanType = {
  value: string;
  onChange: ( newValue: string ) => void;
};

const EditableSpan = ( props: EditableSpanType ) => {
  const [ editMode, setEditMode ] = useState<boolean>( false );
  const [ title, setTitle ] = useState<string>( props.value );

  const activateEditMode = () => {
    setEditMode( true );
    // set to default value in case if we didn't save it
    setTitle( props.value );
  };

  const deactivateEditMode = () => {
    setEditMode( false );
    props.onChange( title );
  };

  const onChangeHandler = ( e: ChangeEvent<HTMLInputElement> ) => {
    // setError( null );
    setTitle( e.currentTarget.value );
  };

  return (
    editMode
      ? <input
        value={ title }
        autoFocus={ true }
        onBlur={ deactivateEditMode }
        onChange={ onChangeHandler } />
      : <span onDoubleClick={ activateEditMode }>{ props.value }</span>
  );
};

export default EditableSpan;