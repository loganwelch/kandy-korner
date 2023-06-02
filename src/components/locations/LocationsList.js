import { useEffect, useState } from "react"
//import { useNavigate } from "react-router-dom"
import "./Locations.css"

export const LocationList = () => {
    const [locations, setLocations] = useState([])
    //const [filteredLocations, setFiltered] = useState([])
    //const navigate = useNavigate()

    //const localKandyUser = localStorage.getItem("kandy_user")
    //const kandyUserObject = JSON.parse(localKandyUser)


    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationArray) => {
                    setLocations(locationArray)
                })
            console.log("Initial state of locations") //view the initial state of locations
        },
        [] // When this array is empty, you are observing initial component state
    )

    return <>

        <h2>Here's our locations yall come get ur sugar</h2>

        <article className="locations">
            {
                locations.map(
                    (location) => {
                        return <section className="location" key={(`location--${location.id}`)}>
                            <header>{location.address}</header>
                            <footer>Square footage: {location.squareFootage}sqft</footer>
                        </section>
                    }
                )
            }
        </article>


    </>
}