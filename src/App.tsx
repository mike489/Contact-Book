import "./App.css";
import ThemeProvider from "./style/theme-provider";
import AppRouter from "./router/router";

const App = () => {
  return (
    <ThemeProvider>
      <AppRouter></AppRouter>
    </ThemeProvider>
  );
};

export default App;
