import React from "react";
import Banner from "./components/Banner";
import Cart from "./components/Cart";
import Menu from "./components/Menu";
import Axios from 'axios';
// import './bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loaded: false,
      total: 0,
      cart: {},
      productIds: []
    };
    this.getProducts = this.getProducts.bind(this);
    this.addToCart = this.addToCart.bind(this)
    this.clearOrder = this.clearOrder.bind(this)
    // this.categorySelected = this.categorySelected.bind(this)
  }
  componentDidMount() {
    this.getProducts('meats');

  }
  getProducts(category) {
    console.log('meat function', category)
    Axios.get('/products',
    {params: {
      product: category
    }
  })
    .then((result)=>{

      this.setState({
        products: result.data,
        loaded: true
      })
      console.log("products", this.state.products)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  handleCategorySelected(category){
    console.log(category)
  }
  addToCart(item) {
    let ids = this.state.productIds;
    let total = this.state.total
    let cartItems = this.state.cart;
    if (!cartItems[item.productName]){
      cartItems[item.productName] = {quantity: item.quantity, id: item.id}
    } else {
      cartItems[item.productName].quantity += item.quantity
    }
    console.log(item.price, "x", item.quantity, "=", (item.price * item.quantity))
    total += (item.price * item.quantity)
    this.setState({cart: cartItems,total: total})
    console.log("CART AFTER UPDATE", this.state.cart)
  }

  clearOrder() {
    this.setState({cart: {},total: 0})
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="header">
            <Banner />
          </div>
          <div className="body">
            <Menu addToCart = {this.addToCart} getProducts = {this.getProducts} products={this.state.products} loaded={this.state.loaded}
            />
          </div>
          <div className="bbqList">
          <Cart clearOrder={this.clearOrder} total={this.state.total} products={this.state.products} cartItems={this.state.cart}/>
          </div>
          <div className="footer"></div>
        </div>
      </div>
    );
  }
}

export default Home;
