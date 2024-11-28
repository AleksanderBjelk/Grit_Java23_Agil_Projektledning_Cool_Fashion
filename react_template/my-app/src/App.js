import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestMain from './JSX/main.jsx';
import TestFooter from './JSX/footer.jsx';
import TestNav from './JSX/nav.jsx';
import TestContact from './JSX/contact.jsx';
import Adminpage from './JSX/adminpage.jsx';
import ProductList from './JSX/ProductList.jsx';
import ResellPage from "./JSX/resellpage.jsx";
import Login from "./JSX/Login.jsx";
import ProductCard from "./JSX/ProductCards.jsx";
import MyPages from "./JSX/MyPages.jsx"

function App() {
  return (
    <Router>
      <div className="App">
        <TestNav />
        <Routes>
          <Route path="/" element={<TestMain />} />
          <Route path="/contact" element={<TestContact />} /> {/* Contact-route */}
          <Route path="/adminpage" element={<Adminpage />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/resell" element={<ResellPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypages" element={<MyPages />} />
          <Route path="/category/:categoryId" element={<ProductCard />} />
          <Route path="/category/:categoryId/:intermediateId" element={<ProductCard />} />
          <Route path="/category/:categoryId/:intermediateId/:subId" element={<ProductCard />} />
        </Routes>
        <TestFooter />
      </div>
    </Router>
  );
}

export default App;
