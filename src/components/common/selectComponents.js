import React from 'react'
import MultiSelect from "@khanacademy/react-multi-select";
import Select from 'react-select';

export const SimpleSelect = (props) => {
    let { values, options, disabled } = props
    return (
        <Select
            selected={values}
            options={options}
            isLoading={!options.length}
            disabled={disabled}
            onSelectedChanged={(e) => props.handleChange(e)}
        />
    )
}

export const SimpleMultiSelect = (props) => {
    let { values, options, disabled } = props
    if (!options.length) {
        values = []
    }
    disabled = disabled || false
    return (
        <MultiSelect
            selected={values}
            options={options}
            isLoading={!options.length}
            disabled={disabled}
            onSelectedChanged={(e) => props.handleChange(e)}
        />
    )
}