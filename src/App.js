import './App.css';
import Header from './components/Header';
import List from './components/List';
import { useSelector } from 'react-redux';

function App() {
  // use class "'dark-mode' to change theme"
  const isDarkMode = useSelector((state) => state.app.darkMode);
  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <Header />
      <List />
    </div>
  );
}

export default App;
