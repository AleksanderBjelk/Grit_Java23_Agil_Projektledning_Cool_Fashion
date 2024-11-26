import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestMain from './JSX/main.jsx';
import TestFooter from './JSX/footer.jsx';
import TestNav from './JSX/nav.jsx';
import TestContact from './JSX/contact.jsx';
import TestAdmin from './JSX/adminpage.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <TestNav />
        <Routes>
          <Route path="/" element={<TestMain />} />
          <Route path="/contact" element={<TestContact />} /> {/* Contact-route */}
          <Route path="/adminpage" element={<TestAdmin />} />
        </Routes>
        <TestFooter />
      </div>
    </Router>
  );
}

export default App;