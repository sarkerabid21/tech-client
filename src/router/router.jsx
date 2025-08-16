import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import PrivateRoute from "../routes/PrivateRoute";
import DashBoardLayout from "../layouts/DashBoardLayout";
import AddProduct from "../pages/DashboardUser/Add Product/AddProduct";
import MyProducts from "../pages/DashboardUser/MyProducts/MyProducts";
import UpdateProduct from "../pages/DashboardUser/MyProducts/UpdateProduct";
import MyProfile from "../pages/DashboardUser/MyProfile/MyProfile";
import Pricing from "../pages/DashboardUser/MyProfile/Pricing";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import ProductPage from "../pages/Home/ProductPage/ProductPage";
import ManageUsers from "../pages/DashboardAdmin.jsx/ManageUsers/ManageUsers";
import ProductReview from "../pages/DashboardModerator/ProductReview/ProductReview";
import Error from "../pages/shared/Error/Error";
import ReportedContent from "../pages/DashboardModerator/ReportedContent/ReportedContent";
import Statistic from "../pages/DashboardAdmin.jsx/Statistic/Statistic";
import Coupon from "../pages/DashboardAdmin.jsx/Coupon/Coupon";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import AdminRoute from "../routes/AdminRoute";
import ModeratorRoute from "../routes/ModeratorRoute";
import DashboardHome from "../pages/DashboardHome/DashboardHome";
import ComingSoon from "../pages/Home/ProductPage/ComingSoon";
import ComingFeature from "../pages/Home/ProductPage/ComingFeature";
import FAQHeader from "../pages/Home/FaqHeader";
// import FAQHeader from "../pages/Home/FAQHeader";

// import Coverage from "../Coverage/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home,

        },
        {
  path: "/product/:id",
  Component: () => (
    <PrivateRoute>
     <ProductDetails></ProductDetails>
    </PrivateRoute>
  ),
},
      {
    path: "/productPage",  // fixed typo here
    element: <ProductPage />,
  },
      {
    path: "/comingsoon",  // fixed typo here
    element: <ComingSoon/>,
  },
      {
    path: "/faq",  // fixed typo here
    element: <FAQHeader/>,
  },
  
      {
    path: "/coming",  // fixed typo here
    element: <ComingFeature/>,
  },
      {
    path: "/unauthorized",  // fixed typo here
    element: <Unauthorized></Unauthorized>,
  },

       
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
        {
           path: "login",
            Component: Login
        },
        {
           path: "register",
            Component: Register
        },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashBoardLayout></DashBoardLayout>
    </PrivateRoute>,
    children: [
       {
            index: true,
            Component: DashboardHome,

        },
      {
        path: 'addProduct',
        element: <AddProduct></AddProduct>
       
      },
      {
        path: 'myProduct',
        element: <MyProducts ></MyProducts>,
       
      },
      {
        path: 'updateProduct/:id',
        element: <UpdateProduct></UpdateProduct>,
       
      },
      {
        path: 'myProfile',
        element: <MyProfile></MyProfile>,
       
      }
      ,
      {
        path: 'payment',
        element: <Pricing></Pricing>,
       
      }
      
,
      {
        path: 'productReview',
        element: <ModeratorRoute><ProductReview></ProductReview></ModeratorRoute>,
       
      }
      ,
      {
        path: 'reported',
        element: <ModeratorRoute><ReportedContent></ReportedContent></ModeratorRoute>,
       
      }
      ,
      {
        path: 'manageUsers',
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>,
       
      },
      {
        path: 'statistic',
        element: <AdminRoute><Statistic></Statistic></AdminRoute>,
       
      },
      {
        path: 'coupon',
        element: <AdminRoute><Coupon></Coupon></AdminRoute>,
       
      },
     
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);