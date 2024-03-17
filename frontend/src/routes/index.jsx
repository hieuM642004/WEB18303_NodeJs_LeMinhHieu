//User routes
import Author from "../Components/Author/Author"
import Contact from "../Components/Contact/Contact"
import DetailBook from "../Components/DetailBook/DetailBook"
import Genres from "../Components/Genres/Genres"
import HomePage from "../Components/Home/HomePage"
import Login from "../Components/Login/Login"
import DetailPosts from "../Components/Posts/DetailPost"
import Posts from "../Components/Posts/Posts"
import Register from "../Components/Register/Register";
import PricingCard from "../Service/PricingCard/PricingCard"
import FormBook from "../admin/Actions/Book/FormBook"
import ReadBooks from "../admin/Actions/Book/ReadBooks"
import FormGenres from "../admin/Actions/Genres/FormGenres"
import ReadGenres from "../admin/Actions/Genres/ReadGenres"
//Admin routes
import Dashboard from "../admin/Components/Dashboard/Dashboard"

const publicRoutes=[
    {path:'/',component:HomePage},
    {path:'/login',component:Login},
    {path:'/register',component:Register},
    {path:'/contact',component:Contact},
    {path:'/book/:id',component:DetailBook},
    {path:'/author/:id',component:Author},
    {path:'/genres/:id',component:Genres},
    {path:'/posts',component:Posts},
    {path:'/posts/:id',component:DetailPosts},
    {path:'/pricing',component:PricingCard},
]


const adminRoutes=[
{path:'/admin/dashboard',component:Dashboard},
{path:'/admin/books',component:ReadBooks},
{path:'/admin/books/add-book',component:FormBook},
{path:'/admin/books/edit-book/:id',component:FormBook},
{path:'/admin/genres',component:ReadGenres},
{path:'/admin/genres/add-genre',component:FormGenres},
{path:'/admin/genres/edit-genre/:id',component:FormGenres},

]

export {publicRoutes,adminRoutes}