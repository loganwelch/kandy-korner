import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"



export const ProductForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [product, update] = useState({
        name: "",
        productTypeId: 0,
        ppu: 0
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the product list
     */
    const navigate = useNavigate()
    const [productTypes, setProductTypes] = useState([])

    //const localKandyUser = localStorage.getItem("kandy_user")
    //const kandyUserObject = JSON.parse(localKandyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You clicked the button")
        // TODO: Create the object to be saved to the API
        /*
        {
            "name": "Nerds Gummy Clusters",
            "productTypeId": 1,
            "ppu": 7
        }
        */
        const productToSendToAPI = {
            name: product.name,
            productTypeId: product.productTypeId,
            ppu: product.ppu
        }

        // TODO: Perform the fetch() to POST the object to the API
        if (product.name !== "" && product.ppu > 0 && product.productTypeId !== 0) {
            return fetch(`http://localhost:8088/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productToSendToAPI)
            })
                .then(response => response.json())
                .then(() => {
                    navigate("/products")
                })
        }
    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/productTypes`)
                .then(response => response.json())
                .then((productsArray) => {
                    setProductTypes(productsArray)
                })
        },
        []
    )



    //RETURN THE FORM HERE LIKE IN TICKETFORM
    return (
        <form className="productForm">
            <h2 className="productForm__title">New Product Addition</h2>
            <fieldset>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What is the name of this new candy"
                        value={product.name}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Candy Type:</label>
                    <select
                        required autoFocus
                        className="form-control"
                        placeholder="Type of Candy"
                        value={product.productTypeId}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.productTypeId = evt.target.value
                                update(copy)
                            }
                        }>
                        <option value="" defaultValue>Select Candy Type</option>
                        {productTypes.map(item => (
                            <option value={item.id} key={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Price:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter the price without a dollar sign"
                        value={product.ppu}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.ppu = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save New Candy
            </button>
        </form>
    )
}