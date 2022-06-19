import React from 'react'

import './filterSwitcher.scss'

// interface IFilterSwitcherProps {
//     disabled?: boolean 
//     caption?: string | undefined
//     onChange():void 
// }

export default function FilterSwitcher(props/*: IFilterSwitcherProps*/) {
    return (
        <label className='filter-switcher'>
            <input className='filter-switcher__checkbox' type="checkbox" name="" onChange={props.onChange} disabled={!!props.disabled}/>
            {props.caption && <span className='filter-switcher__caption'>{props.caption && props.caption}</span>}
        </label>
    )
}
