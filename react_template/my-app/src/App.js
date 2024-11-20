import TestHeader from'./JSX/header.jsx';
import TestMain from'./JSX/main.jsx';
import TestFooter from './JSX/footer.jsx';
import TestCards from './JSX/cards.jsx';
import TestNav from './JSX/nav.jsx';

function App() {
  return (
    <div className="App">
      <TestHeader/>
      <TestNav/>
      <TestMain/>
      <TestCards/>
      <TestFooter/>
      
    </div>
  );
}

export default App;
