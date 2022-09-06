import SignUp from './pages/signup/SignUp'
import Dashboard from './pages/Dashboard';
import { ContextProvider } from './context/ContextProvider';
import './index.css'


function App() {
  return (
    <ContextProvider>
      <SignUp />
      <Dashboard />
    </ContextProvider>
  );
}

export default App;
