import CategoryForm from "./addcategories";
import ProductList from "./ProductList";
import ProductForm from "./addProducts";
import ContactMessages from "./ContactMessages";
import "../../CSS/adminpage.css";

export function Adminpage() {
    return (
        <div className="admin-page-container">
            <div className="admin-section">
                <CategoryForm />
            </div>
            <div className="admin-section">
                <ProductForm />
            </div>
            <div className="admin-section">
                <ProductList />
            </div>
            <div className="admin-section">
                <ContactMessages />
            </div>
        </div>
    );
}

export default Adminpage;
