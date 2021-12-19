import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  addItemHandler = async (id) => {
    // const itemIndex = this.state.items.findIndex((e) => e.id == id);
    const newItems = this.state.items.map((el) =>
      el.id == id ? { ...el, quantity: ++el.quantity } : el
    );
    await axios.post(`http://localhost:4001/${id}`);
    this.setState({ items: newItems });
  };
  handleServerResponse = (products, basket) => {
    console.log(products, basket);
    const items = products.map((e) => {
      const basketIndex = basket.findIndex((b) => b.id == e.id);
      // console.log(e.id);
      const quantity = basketIndex !== -1 ? basket[basketIndex].quantity : 0;
      return { ...e, quantity };
    });
    console.log(items);
    return items;
  };
  state = { items: [] };
  componentDidMount() {
    Promise.all([
      axios.get('http://localhost:4000/products'),
      axios.get('http://localhost:4001/basket')
    ]).then((responses) =>
      this.setState({
        items: this.handleServerResponse(responses[0].data, responses[1].data)
      })
    );
  }
  render() {
    return (
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Price</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.items.map((item) => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.price}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={() => this.addItemHandler(item.id)}
                  >
                    Add
                  </button>{' '}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
