import CategoryForm from "./addcategories";
import ProductList from "./ProductList";
import ProductForm from "./addProducts";
import '../CSS/adminpage.css'

     export function Adminpage(){


        return(
            <div className="admin-page-container">
            <CategoryForm/>
            <ProductForm/>
            <ProductList/>
            </div>
        )
};

export default Adminpage;
