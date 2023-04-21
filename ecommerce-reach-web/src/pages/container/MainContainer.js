import React from "react";
import { Link } from "react-router-dom";

const MainContainer = (prop) =>{
    return(
        <div>
            <ul>
                <li><Link to="./">Home</Link></li>
                <li><Link to="./user">Users</Link></li>
                <li><Link to="./">Home</Link></li>
                <li><Link to="./">Home</Link></li>
                {prop.children}
            </ul> <br />
        </div>
    );
}

export default MainContainer