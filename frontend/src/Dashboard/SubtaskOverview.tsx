import React from "react";
import {
    useParams
  } from "react-router-dom";


type Props = {

}

export function SubtaskOverview(props: Props){
    let { id } = useParams();

    return (
        <div>
        <h1> Fix Gearing Cover - #{id}</h1>
        <h4> TODO: Show involved people</h4>
        <h4> TODO: Buttons add/Remove People</h4>
        <h4> TODO: Show related pdf pages</h4>
        <h4> TODO: Start task/Continue task button</h4>
        <h4> TODO Add Comment button</h4>
        <h4> TODO: Add Question/Edit Question Button</h4>
        </div>
    );
}