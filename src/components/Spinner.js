import React, { useState } from 'react'
import { css } from "@emotion/react";
import MoonLoader from "react-spinners/ClipLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Spinner = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    return (
        <>
            <div className="sweet-loading">
                <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
                <input value={color} onChange={(input) => setColor(input.target.value)} placeholder="Color of the loader" />

                <MoonLoader color={color} loading={loading} css={override} size={150} />
            </div>
        </>
    )
}

export default Spinner
