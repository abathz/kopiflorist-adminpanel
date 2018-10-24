const routes = require('next-routes')

module.exports = routes()
  .add('home', '/dashboard', 'home')
  .add('signup', '/signup', 'signup')

  // Coffee Trip
  .add('coffeetriplist', '/coffee_trip', 'coffeetriplist')
  .add('createcoffeetrip', '/create_coffee_trip', 'createcoffeetrip')
  .add('editcoffeetrip', '/edit_coffee_trip/:id', 'editcoffeetrip')

  // Product
  .add('productlist', '/product', 'productlist')
  .add('createproduct', '/create_product', 'createproduct')
  .add('editproduct', '/edit_product/:id', 'editproduct')
  .add('createcategoryproduct', '/create_category', 'createcategoryproduct')

  // User Account
  .add('useraccountlist', '/user', 'useraccountlist')

  // Discount
  .add('discountlist', '/discount', 'discountlist')
  .add('creatediscount', '/create_discount', 'creatediscount')

  // Coupon
  .add('couponlist', '/coupon', 'couponlist')
  .add('createcoupon', '/create_coupon', 'createcoupon')
  .add('editcoupon', '/edit_coupon/:id', 'editcoupon')

  // Blog
  .add('bloglist', '/blog', 'bloglist')
  .add('createblog', '/create_blog', 'createblog')
  .add('editblog', '/edit_blog/:id', 'editblog')

  // Banner
  .add('banner', '/banner', 'banner')
  .add('createbanner', '/create_banner', 'createbanner')
  .add('editbanner', '/edit_banner/:id', 'editbanner')
