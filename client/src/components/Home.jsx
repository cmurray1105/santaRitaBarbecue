import Banner from "./Banner";
import Menu from "./Menu";
import Axios from "axios";
import React from "React";
import Navbar from "./Navbar";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loaded: false,
      total: 0,
      cart: {},
      categories: [],
      quantity: 0,
    };
    this.getProducts = this.getProducts.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.clearOrder = this.clearOrder.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.convertPriceToString = this.convertPriceToString.bind(this);
    this.cartQuantityCalc = this.cartQuantityCalc.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    // this.categorySelected = this.categorySelected.bind(this)
  }
  componentDidMount() {
    this.getProducts("meats");
    this.getCategories();
    this.cartQuantityCalc();
  }
  cartQuantityCalc = () => {
    let total = 0;
    for (let item in this.state.cart) {
      total = total + this.state.cart[item].quantity;
    }
    this.setState({ quantity: total });
  };
  convertPriceToString = (price) => {
    let priceString = price.toString();
    if (priceString.includes(".")) {
      if (priceString.split(".")[1].length === 1) {
        priceString += "0";
      } else {
        priceString =
          priceString.split(".")[0] +
          "." +
          priceString.split(".")[1].slice(0, 2);
      }
    } else {
      priceString += ".00";
    }
    return priceString;
  };
  getCategories = () => {
    Axios.get("/categories").then((result) => {
      let cats = [];
      for (let i = 0; i < result.data.length; i++) {
        cats.push(result.data[i].name);
      }
      this.setState({ categories: cats });
    });
  };
  getProducts(category) {
    Axios.get("/products", {
      params: {
        product: category,
      },
    })
      .then((result) => {
        this.setState({
          products: result.data,
          loaded: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  increaseQuantity(item) {
    let cartItems = this.state.cart;
    cartItems[item].quantity++;
    this.setState({ cart: cartItems });
    this.cartQuantityCalc();
  }
  decreaseQuantity(item) {
    let cartItems = this.state.cart;
    cartItems[item].quantity--;
    if (cartItems[item].quantity === 0) {
      delete cartItems[item];
    }
    this.setState({ cart: cartItems });
    this.cartQuantityCalc();
  }
  addToCart(item) {
    // let ids = this.state.productIds;
    let total = this.state.total;
    let cartItems = this.state.cart;
    if (!cartItems[item.productName]) {
      cartItems[item.productName] = {
        quantity: item.quantity,
        id: item.id,
        originalQuantity: item.originalQuantity,
        price: item.price,
        image: item.image_url,
        productInfo: item.productInfo,
        // item: this.state.products[item]
      };
    } else {
      // cartItems[item.productName].item.push(products[productName])
      cartItems[item.productName].quantity += item.quantity;
    }
    this.cartQuantityCalc();
    total += item.price * item.quantity;
    this.setState({ cart: cartItems, total: total });
  }

  clearOrder() {
    this.setState({ cart: {}, total: 0 });
    this.cartQuantityCalc();
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="fixed-header">
            <Navbar
              clearOrder={this.clearOrder}
              total={this.state.total}
              products={this.state.products}
              cartItems={this.state.cart}
              convertPriceToString={this.convertPriceToString}
              quantity={this.state.quantity}
              increaseQuantity={this.increaseQuantity}
              decreaseQuantity={this.decreaseQuantity}
            />
          </div>
          <div className="header">
            <Banner />
          </div>
          <div className="body">
            <Menu
              addToCart={this.addToCart}
              getProducts={this.getProducts}
              loaded={this.state.loaded}
              products={this.state.products}
              cartItems={this.state.cart}
              categories={this.state.categories}
              convertPriceToString={this.convertPriceToString}
            />
          </div>

          <div className="footer"></div>
        </div>
      </div>
    );
  }
}

export default Home;
