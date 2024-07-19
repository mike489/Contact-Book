import "./App.css";
import ThemeProvider from "./style/theme-provider";
import AppRouter from "./router/router";
// import ContactFrom from "./features/form/addcontact-form/contact-form";

const App = () => {
  return (
    <ThemeProvider>
     
      <AppRouter></AppRouter>
    </ThemeProvider>
  );
};

export default App;
