import React, { Suspense } from 'react'
import './App.css'
import Layout from './componenets/Layout/Layout'
import { ImSpinner2 } from "react-icons/im"

const ProductsList = React.lazy(() => import('./componenets/ProductsList/ProductsList'))
const Cart = React.lazy(() => import('./componenets/Cart/Cart'))


function App() {

  return (
    <div className="App">
      <Layout >
        <Suspense fallback={<div className='loading-page'>
          <ImSpinner2 />
        </div>}>
          <ProductsList />
          <Cart />
        </Suspense>

      </Layout>
    </div>
  )
}

export default App
