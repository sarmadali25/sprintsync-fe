import "./App.css";
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppRouter from "./routing/AppRouter";

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
