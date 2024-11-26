import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestMain from './JSX/main.jsx';
import TestFooter from './JSX/footer.jsx';
import TestNav from './JSX/nav.jsx';
import TestContact from './JSX/contact.jsx';
import TestAdmin from './JSX/adminpage.jsx';
import ProductList from './JSX/ProductList.jsx';
import ResellPage from "./JSX/resellpage.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <TestNav />
        <Routes>
          <Route path="/" element={<TestMain />} />
          <Route path="/contact" element={<TestContact />} /> {/* Contact-route */}
          <Route path="/adminpage" element={<TestAdmin />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/resell" element={<ResellPage />} />
        </Routes>
        <TestFooter />
      </div>
    </Router>
  );
}

export default App;
