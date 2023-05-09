import React, { useState, useEffect } from 'react';

const welcomeTypes = ['Good morning 🌞', 'Good afternoon 🌇', 'Good evening 🌝'];


const Greeting = props => {
    const hour = props.hour;
    
    const [greet, setGreet] = useState(0);

    useEffect(() => {
        if (hour < 12) setGreet(0)
        else if (hour < 18) setGreet(1)
        else setGreet(2)
    }, [hour])

    return(<div>
        {welcomeTypes[greet]}
    </div>)
}

export default Greeting;