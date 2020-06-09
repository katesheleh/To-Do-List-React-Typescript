import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Button, TextField, IconButton } from '@material-ui/core';
import { AddBox } from "@material-ui/icons";

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
      setError( 'Title is required!' );
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
    <TextField
      variant={ 'outlined' }
      value={ title }
      onChange={ onChangeHandler }
      onKeyPress={ onKeyPressHandler }
      error={ !!error }
      label={ 'Title' }
      helperText={ error }
    />

    <IconButton color={ 'primary' } onClick={ addItem }>
      <AddBox />
    </IconButton>

  </div> );
}
