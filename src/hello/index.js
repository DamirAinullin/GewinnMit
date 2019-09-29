import React from 'react';

function Hello(props) {
    function sayHello(name) {
        return 'Hello ' + name;
    }

    return <p onClick={props.onPress}>{sayHello(props.name)}</p>
}

export default Hello;