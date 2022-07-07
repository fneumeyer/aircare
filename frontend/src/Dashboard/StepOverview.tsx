import { useParams } from "react-router-dom";
import React from "react";

type Props = {

}

export function StepOverview(props: Props){
    let { id } = useParams();


    return (
        <div className="root-container">
            <h4>TODO: Tabs</h4>
            <h4>TODO: Mastercard</h4>
            <h4>TODO: WIKI Page</h4>
            <h4>TODO: Question Button</h4>
            <h4>TODO: Next step button</h4>

        </div>
    );

}