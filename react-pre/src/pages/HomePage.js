import React, { Component } from 'react'
import Layout from './Layout'

export default class Homepage extends Component {
  render() {

    return (
      <Layout showTopBar={false} showBottomBat={true} title="首页">
        {/* <div>
          <h3>Homepage</h3>
        </div> */}
        {
          {
            content: (<div>
              <h3>Homepage</h3>
            </div>),
            text: '文本',
            btnclick: ()=>console.log('aaa')
          }
        }
      </Layout>
    )
  }
}
