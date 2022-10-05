import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Uploader } from "./components/FileConverter/Uploader";
import { Counter } from "./components/Counter";

import "./custom.css";

const App = () => {
  return (
    <Layout>
      <Route exact path="/" component={Home} />
      <Route path="/counter" component={Counter} />
      <Route path="/fetch-data" component={Uploader} />
    </Layout>
  );
};

export default App;
