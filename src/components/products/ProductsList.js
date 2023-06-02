import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Products.css"

export const ProductList = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [expensive, setExpensive] = useState(false)
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            if (expensive) {
                const expensiveKandy = products.filter(product => product.ppu >= 2)
                setFiltered(expensiveKandy)
            }
            else {
                setFiltered(products)
            }
        },
        [expensive]
    )

    useEffect(() => {
        const sortedProducts = products.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
        setFiltered(sortedProducts);
    },
        [products]
    );





    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_expand=productType`)
                .then(response => response.json())
                .then((productArray) => {
                    setProducts(productArray)
                })
            //console.log("Initial state of products") //view the initial state of products
        },
        [] // When this array is empty, you are observing initial component state
    )

    return <>
        {
            kandyUserObject.staff
                ? <>
                    <button onClick={() => { setExpensive(true) }} >Top Price</button>
                    <button onClick={() => { setExpensive(false) }} >Show All</button>
                    <button onClick={() => navigate("/product/create")} >Create New Candy</button>
                </>
                : <>
                    <button onClick={() => { setExpensive(true) }} >Top Price</button>
                    <button onClick={() => { setExpensive(false) }} >Show All</button>
                </>
        }
        <h2>Here's our products yall</h2>

        <article className="products">
            {
                filteredProducts.map(
                    (product) => {
                        return <section className="product" key={(`product--${product.id}`)}>
                            <header>{product.name}</header>
                            <footer>Price: {product.ppu.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD"
                            })}</footer>
                            <footer>Type: {product.productType.name}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}