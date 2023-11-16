import { AuthProvider } from "./contexts/AuthContext.js";
import Router from "./router/Router.js";
import "./sass/import.scss";

function App() {
  return <>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </>
}

export default App;