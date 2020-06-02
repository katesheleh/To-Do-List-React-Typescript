import React, { useState, ChangeEvent, KeyboardEvent } from "react";
type AddItemFormPropsType = {
  addItem: ( title: string ) => void;
};
export function AddItemForm( props: AddItemFormPropsType ) {

  let [ title, setTitle ] = useState( "" );
  let [ error, setError ] = useState<string | null>( null );

  const addItem = () => {
    let preparedTitle = title.trim();

    if ( preparedTitle ) {
      props.addItem( preparedTitle );
    }
    else {
      setError( 'Ttitle is required!' );
    }
    setTitle( "" );
  };
  const onChangeHandler = ( e: ChangeEvent<HTMLInputElement> ) => {
    setError( null );
    setTitle( e.currentTarget.value );
  };
  const onKeyPressHandler = ( e: KeyboardEvent<HTMLInputElement> ) => {
    if ( e.charCode === 13 ) {
      addItem();
    }
  };
  return ( <div>
    <input
      value={ title }
      onChange={ onChangeHandler }
      onKeyPress={ onKeyPressHandler }
      className={ error ? 'error' : '' } />

    <button onClick={ addItem }>+</button>

    { error && <div className={ 'error-message' }>{ error }</div> }
  </div> );
}
