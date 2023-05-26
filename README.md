#RoomFinder_2.0

## Usage
- `npm`
- `npm install`
 - `cd client`
   - `npm run dev`
 - `cd server`
   - `npm start`

## Tech Stack

1. [React JS](https://reactjs.org/docs/getting-started.html/)
2. React Router
3. Redux/Redux Persist
4. UI Library: [Material Design](https://mui.com/) [Ant Design]
5. [Formik & Yup](https://formik.org/docs/guides/validation) for Form Validation in React
6. [Mongo DB](https://www.mongodb.com/docs/), [Express](https://expressjs.com/en/starter/installing.html)
7. [Node JS](https://nodejs.org/en/)
8. Password encryption using [Bcrypt](https://www.becrypt.com/uk/)
10. [JsonWebToken](https://jwt.io/introduction) Authentication/Authorization
11. Middlewares
12. Twailwind Css

## Features

- [x] Register page

- [x] Login page
  - [ ] Reset password

- [x] User Dashbord
  - [x] After login Dispay all products
  - [x] Able to add to cart
  - [x] Search with category or keyword(name,sku,description)
  - [ ] payment gateway khalti

- [x] Admin Dashboard
  - [x] Display Admin information(name,email,phone,address)
   - [x] Add Category and displaly category list
   - [x] Add Product, Display all product, delete product, update product
  - [ ] Orders list

- [x] Without login
  - [x] Desplay all product