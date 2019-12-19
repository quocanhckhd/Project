import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers : [],
        firstname : '',
        lastname : '',
        age: 0,
        position: 0,
        color: "gray"
    };
  }

  addFirstname = e => {
    const firstname = e.target.value;
    this.setState({ firstname : firstname });
  }

  addLastname = e => {
    const lastname = e.target.value;
    this.setState({ lastname : lastname });
  }

  addAge = e => {
    const age = e.target.value;
    this.setState({age : age});
  } 

  addCustomer = () => {
    const customers = this.state.customers;
    const customer = {
      firstname : this.state.firstname,
      lastname : this.state.lastname,
      age : this.state.age
     }
    customers.push(customer);
    this.setState({ customers : customers });
    axios.post('http://localhost:8081/api/customers',customer)
    .then(res => console.log(res.data))
    .catch(err => this.setState({ errors: err.response.data }));
  }

  delete = e => {
    const position = e.target.value;
    this.setState({ position : position });
  }

  deleteCustomer = () => {
    const customers = this.state.customers;
    customers.splice(this.state.position-1,1);
    this.setState({ customers : customers });
  }

  updateCustomer = () => {
    const customers = this.state.customers;
    const customer = {
      firstname : this.state.firstname,
      lastname : this.state.lastname,
      age : this.state.age
    };
    customers[this.state.position-1] = customer;
    this.setState({ customers : customers });
  }

  changeBlue = () => {
    this.setState({ color : "blue" });
  }

  changeRed = () => {
    this.setState({ color : "red" });
  }

  changeYellow = () => {
    this.setState({ color : "yellow" });
  }

  changeBlack = () => {
    this.setState({ color : "black" });
  }

  render() {
    const list = this.state.customers.map((customer,i) => (
      <tr className={color}>
        <td>{customer.firstname}</td>
        <td>{customer.lastname}</td>
        <td>{customer.age}</td>
      </tr>
    ));
    const color = this.state.color;
    return (
      <div className="App">
        <table>
          <thead>
            <tr className={color}>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody className={color}>
            {list}
          </tbody>
        </table> 
          <div><input placeholder="firstname" type="text" onChange={this.addFirstname}/></div>
          
          <div><input placeholder="lastname" type="text" onChange={this.addLastname}/></div>

          <div><input placeholder="age" type="number" onChange={this.addAge}/></div>

          <div><input placeholder="Position" type="number" onChange={this.delete}/></div>

          <input type="submit" value="Add" onClick={this.addCustomer}/>

          <input type="submit" onClick={this.deleteCustomer} value="Delete" />

          <input type="submit" value="Update" onClick={this.updateCustomer} />
          <select>
            <option>Gray</option>
            <option onClick={this.changeBlue}>Blue</option>
            <option onClick={this.changeRed}>Red</option>
            <option onClick={this.changeYellow}>Yellow</option>
            <option onClick={this.changeBlack}>Black</option>
          </select>
      </div>
    );
  }
}
export default App;