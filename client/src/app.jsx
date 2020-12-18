import React from "react";
import Banner from "./components/Banner";
import Cart from "./components/Cart";
import Menu from "./components/Menu";
import Axios from 'axios';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loaded: false
    };
    this.getProducts = this.getProducts.bind(this);
  }
  componentDidMount() {
    this.getProducts('meats');
  }
  getProducts(category) {
    console.log('meat function', category)
    Axios.get('/meats',
    {params: {
      product: category
    }
  })
    .then((result)=>{

      this.setState({
        products: result.data,
        loaded: true
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="header">
            <Banner />
          </div>
          <div className="body">
            <Menu getProducts = {this.getProducts} products={this.state.products} loaded={this.state.loaded}/>
          </div>
          <div className="bbqList">
          <Cart />
          </div>
          <div className="footer"></div>
        </div>
      </div>
    );
  }
}

export default App;
