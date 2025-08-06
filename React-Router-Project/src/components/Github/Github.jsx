import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

export default function Github() {
    const data = useLoaderData()
    // const [data, setData] = useState([])
    // useEffect(() => {
    //     fetch('https://api.github.com/users/Vintage-K11')
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //         setData(data)
    //     })
    // },[])

    return (
        <div className="bg-gray-700 text-amber-200 text-3xl p-4">
            Github Username : {data.name} <br />
            Github Repo : {data.public_repos} <br />

            <img src={data.avatar_url} alt="Profile Pic" width={300}  className="mx-auto"/>
        </div>
    )
}

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/Vintage-K11');
    const data = await response.json(); // Parse JSON
    // console.log(data); // Log full data
    return data; // Return data to useLoaderData
}
