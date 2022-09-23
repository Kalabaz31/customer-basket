import './App.css'
import Cart from './componenets/Cart/Cart'
import Layout from './componenets/Layout/Layout'
import ProductCard from './componenets/productCard/ProductCard'
import ProductsList from './componenets/ProductsList/ProductsList'

function App() {

  return (
    <div className="App">
      <Layout >
        <ProductsList />
        <Cart />
      </Layout>
    </div>
  )
}

export default App
