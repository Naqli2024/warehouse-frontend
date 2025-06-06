import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import "./styles/style.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
      <ToastContainer autoClose={2000}/>
    </Provider>
  );
}

export default App;
