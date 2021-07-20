import Header from "./components/ui/header";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import SinglePost from "./components/singlePost";
import Dashboard from "./components/ui/dashboard/dashboard";
//import RichTextEditor from "./components/ui/dashboard/richEditor";
import DesciptionTest from "./components/descriptionTest";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/posts/:id">
            <SinglePost />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/desc">
            <DesciptionTest />
          </Route>

          {/* <Route exact path="/richText">
            <RichTextEditor />
          </Route> */}
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
