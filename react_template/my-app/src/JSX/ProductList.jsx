import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState} from "react";
import { db } from "../data/firebase";
import '../CSS/productList.css'


function ProductList(){
    const[products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
          const productsCollection = collection(db, "products"); // "products" is your collection name
          const productSnapshot = await getDocs(productsCollection);
          const productList = productSnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name
          }));
          setProducts(productList);
        };
    
        fetchProducts();
      }, []);

      return(
        <div className="product-list-container">
            <h1>Product List</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                    <span>
                    {"ID: " + product.id + " NAME: " + product.name}
                    </span>
                    <button>ÄNDRA</button>
                    </li>
                )
                )}
            </ul>

        </div>

      );

    
}
export default ProductList;



