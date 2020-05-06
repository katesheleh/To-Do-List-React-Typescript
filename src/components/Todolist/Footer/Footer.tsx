import React from 'react';
import Button from '../../common/Button/Button';

export function Footer() {
    return <div className="todoList-footer">
        {/* <button>All</button>
        <button>Completed</button>
        <button>Active</button> */}
        <Button value={'All'}/>
        <Button value={'Completed'}/>
        <Button value={'Active'}/>
    </div>
}
