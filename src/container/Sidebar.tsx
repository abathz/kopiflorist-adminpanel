import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'routes'
import { logout } from 'actions'

class Sidebar extends Component<{ logout: typeof logout }, {}> {

  logout = () => {
    this.props.logout()
  }

  render () {
    return (
      <div className='sidebar text-center'>
        <p className='text-hel-95 text-l text-white mt-4'>Admin</p>
        <img src='/static/img/logo.png' alt='Kopi Florist'/>
        <ul className='list-sidebar text-right mt-4'>
          <Link prefetch={true} route='/dashboard'><li>Transaction</li></Link>
          <Link prefetch={true} route='coffeetriplist'><li>Coffee Trip</li></Link>
          <Link prefetch={true} route='productlist'><li>Product</li></Link>
          <Link prefetch={true} route='useraccountlist'><li>User Account</li></Link>
          {/* <Link prefetch={true} route='discountlist'><li>Discount</li></Link> */}
          <Link prefetch={true} route='couponlist'><li>Coupon</li></Link>
          <Link prefetch={true} route='bloglist'><li>Blog</li></Link>
          <Link prefetch={true} route='banner'><li>Home Banner</li></Link>
          <Link prefetch={true} route='pickupmethod'><li>Pickup Method</li></Link>
        </ul>
        <div className='text-white text-hel-bold' style={{ cursor: 'pointer' }} onMouseDown={this.logout}>Sign Out</div>
      </div>
    )
  }
}

export default connect(null, { logout })(Sidebar)
