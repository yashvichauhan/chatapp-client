import React from 'react'
import axios from 'axios'
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { Input } from 'antd';
import 'antd/dist/antd.css'

import ChatGroups from '../ChatGroups/chatGroup'
import cssClassses from './searchuser.module.css'
const { Search } = Input;

class SearchUser extends React.Component {
  constructor(props) {
    super(props);
    this.fetchUser = debounce(this.fetchUser, 800);
  }
  state = {
    data: [],
    fetching: false,
    notFound:true
  };
  fetchUser = value => {
    console.log('fetching user', value);
    if(value.trim()!==''){
      //Set state variables
      this.setState({
        data: [],
        fetching: true 
      });
      //Send request
      axios.post("http://localhost:4004/user/search",{search: value},{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
      })
      .then((res)=>{
        if(res.data.length!==0){
          console.log(res.data)
          const data=res.data.map((user)=>({
              key:user._id,
              email:user.email,
              name:user.name,
              avatar: user.avatar
          }))
          this.setState({
              data,
              notFound:false
          })
        }
        else{
            this.setState({ notFound:true });
        }
        this.setState({fetching:false})
        console.log(this.state.data)
      })
      .catch((err)=>{
        console.log(err)
        this.setState({fetching:true})
      })
    }else{
      this.setState({
        data:[],
        fetching:false
      })
    }
  };

  render() {
    const { fetching, data} = this.state;
    return (
      <>
        <Search
            placeholder="input search user"
            allowClear
            loading={fetching}
            onSearch={this.fetchUser}
            className={cssClassses.input}
        />
        <hr style={{color:'#3d4761'}} ></hr>
        <div style={{color:"white"}}>
            {data.map((user)=>(
                <ChatGroups userData={user}/>
            ))}
        </div>
      </>
    );
  }
}

export default SearchUser;