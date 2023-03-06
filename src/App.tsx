import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Store } from "./pages/Store";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

function App() {
	return (
		<ShoppingCartProvider>
			<Navbar></Navbar>
			<Container className="mb-4">
				<Routes>
					<Route path="/shopping-cart/" element={<Home />}></Route>
					<Route path="/shopping-cart/about" element={<About />}></Route>
					<Route path="/shopping-cart/store" element={<Store />}></Route>
				</Routes>
			</Container>
		</ShoppingCartProvider>
	);
}

export default App;
