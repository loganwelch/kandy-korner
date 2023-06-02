import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/LocationsList.js"
import { ProductList } from "../products/ProductsList.js"
import { ProductForm } from "../products/ProductForm.js"

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner Shop</h1>
					<div>"A day without sugar is like a year without rain" --Selena Gomez</div>

					<Outlet />
				</>
			}>
				<Route path="products" element={<ProductList />} />
				<Route path="locations" element={<LocationList />} />

				<Route path="product/create" element={<ProductForm />} />

			</Route>
		</Routes>
	)
}

