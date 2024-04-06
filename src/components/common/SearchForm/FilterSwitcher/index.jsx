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
            <input className='filter-switcher__checkbox' type="checkbox" name="short-movies-checkbox" onChange={(e)=>{props.onChange(e.target.checked)}} checked={props.value}/>
            {props.caption && <span className='filter-switcher__caption'>{props.caption && props.caption}</span>}
        </label>
    )
}
