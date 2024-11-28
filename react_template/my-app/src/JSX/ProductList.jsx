import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../data/firebase";
import '../CSS/productList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newImages, setNewImages] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        price: doc.data().price,
        images: doc.data().images,
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const deleteFromDb = async (id) => {
    try {
      const productDoc = doc(db, "products", id);
      await deleteDoc(productDoc); //Delete the document
      //Update the local state to remove the deleted product
      setProducts(products.filter(product => product.id !== id));
      alert("Produkten har tagits bort.");
    } catch (error) {
      console.error("Error deleting product: ", error);
      alert("Lyckades inte ta bort produkten.");
    }
  };

  const handleProductUpdate = async (id) => {
    if (!newName || !newPrice || !newImages || isNaN(newPrice) || newPrice <= 0) {
      alert('Lägg till namn, pris och bild');
      return;
    }

    const productDoc = doc(db, "products", id);
    try {
      await updateDoc(productDoc, {
        name: newName,
        price: parseFloat(newPrice),
        images: newImages,
      });

      setProducts(products.map((product) =>
        product.id === id
          ? { ...product, name: newName, price: newPrice, images: newImages }
          : product
      ));

      setNewName('');
      setNewPrice('');
      setNewImages('');
      setEditProductId(null);
    } catch (error) {
      console.error("Error", error);
      alert("Lyckades inte uppdatera produkten.");
    }
  };

  return (
    <div className="product-list-container">
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>
            {product.name} <br />
            SEK: {product.price}
                        </span>
            {editProductId === product.id ? (
              <div>
                {}
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Nytt Namn"
                />
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="Nytt Pris"
                />
                <input
                  type="text"
                  value={newImages}
                  onChange={(e) => setNewImages(e.target.value)}
                  placeholder="Ny bildaddress"
                />
                
                <button onClick={() => handleProductUpdate(product.id)}>Uppdatera Produkten</button>              
              </div>
            ) : (
              <div>
              <button onClick={() => { 
                //visar vad som redan finns där
                setEditProductId(product.id);
                setNewName(product.name);
                setNewPrice(product.price);
                setNewImages(product.images);
              }}>Ändra</button>
              <button onClick={() => deleteFromDb(product.id)}>Radera</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
