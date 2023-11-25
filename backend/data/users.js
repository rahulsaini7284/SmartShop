import bcryptjs from "bcryptjs";

const users = [
  {
    name: "Rahul Saini",
    email: "rahulsaini7284@gmail.com",
    password: bcryptjs.hashSync("saini7284", 10),
    isAdmin: true,
  },
  {
    name: "Jaspreet Singh",
    email: "jaspreet@gmail.com",
    password: bcryptjs.hashSync("singh7284", 10),
  },
  {
    name: "Vikas Sen",
    email: "vikas@gmail.com",
    password: bcryptjs.hashSync("sen7284", 10),
  },
];
export default users;
