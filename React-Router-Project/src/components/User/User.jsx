import React from "react";
import { useParams } from "react-router-dom";

export default function User() {
    const {userid} = useParams()

    return (
        <div className="bg-gray-700 text-amber-200 text-3xl p-4">
        User : {userid}
        </div>
    )
}