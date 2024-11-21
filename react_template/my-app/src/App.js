import TestMain from'./JSX/main.jsx';
import TestFooter from './JSX/footer.jsx';
import TestCards from './JSX/ProductCards.jsx';
import TestNav from './JSX/nav.jsx';

function App() {
  return (
    <div className="App">
      <TestNav/>
      <TestMain/>
      <TestCards/>
      <TestFooter/>
    </div>
  );
}

export default App;
