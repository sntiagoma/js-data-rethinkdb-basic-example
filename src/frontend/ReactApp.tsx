import store from './store';
import React, {Component, SyntheticEvent, FormEvent} from "react";
import { Mapper, DataStore } from 'js-data';

const User : Mapper = store.getMapper('user');

export default class App extends Component<any, any>{
  constructor(props: any) {
    super(props);
    this.state = { users: [], name: ""};
  }
  
  componentDidMount() {
    this.refresh();
  }
  
  render() {
    return (
      <div>
        <h1>Users <button onDoubleClick={this.deleteAll}>delete all</button></h1>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(
              e => (
                <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>
                  <button onDoubleClick={this.delete(e.id)} title="Double click to delete">delete</button>
                </td>
              </tr>
              )
              )}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>{this.state.users.length}</td>
            </tr>
          </tfoot>
        </table>
        <h2>Create user</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }

  refresh = () => {
    User.findAll({}).then( users => {
      this.setState({
        users
      })
    });
  }

  delete = (id: string) => {
    return async () => {
      await User.destroy(id);
      this.refresh();
    }
  }

  deleteAll = async() => {
    await User.destroyAll({});
    this.refresh();
  }

  create = async (user: any) => {
    await User.create(user);
    this.refresh();
  }

  handleSubmit = (event: SyntheticEvent) => {
    this.create({name: this.state.name});
    this.setState({name: ''});
    event.preventDefault();
  }

  handleChange = (event: FormEvent<HTMLInputElement>) => {
    this.setState({name: event.currentTarget.value});
  }

  get User(): Mapper {
    return User;
  }

  get store(): DataStore {
    return store;
  }
}