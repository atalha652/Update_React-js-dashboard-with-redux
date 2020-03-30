import React from 'react';
import Loader from 'react-loader-spinner'

const CustomLoader = (props) => {
    return (
        <div className="row" style={props.customstyles} >
            <Loader
                type={props.type}
                color={props.color}
                height={props.width}
                width={props.height}
            />
        </div>

    );
}

export default CustomLoader;

CustomLoader.defaultProps = {
    customstyles: { "marginLeft": "40%" },
    width: 100,
    height: 100,
    color: "#1e8d9a",
    type: "Triangle"
}