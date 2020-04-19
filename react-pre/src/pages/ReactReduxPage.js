import React, { Component } from 'react'
import { connect } from 'react-redux'

export default connect(
  //mapStateToProps,把state映射到props上
  state => ({ num: state }),

  //mapDispatchToProps,把dispatch映射到props上
  {add:()=>({type:'ADD'})}
)
  (class ReactReduxPage extends Component {
    render() {
      const { num, add} = this.props
      console.log(this.props);
      return (
        <div>
          <h3>ReactReduxPage</h3>
          <p>{num}</p>
          {/* <p onClick={() => dispatch({ type: 'ADD' })}>{num}</p> */}
          <button onClick={add}>add</button>
        </div>
      )
    }
  })

