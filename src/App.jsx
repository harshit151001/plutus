import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GoogleSignIn from "./routes/signIn";
import PrivateRoute from "./components/privateRoute/privateRoute";
import Posts from "./routes/posts";
import Author from "./routes/author";
import Updates from "./routes/updates";
import Navigation from "./components/navigation/navigation";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<GoogleSignIn />} />
        <Route path="/posts" element={<PrivateRoute />}>
          <Route path="/posts" element={<Posts />} />
        </Route>
        <Route path="/author" element={<PrivateRoute />}>
          <Route path="/author" element={<Author />} />
        </Route>
        <Route path="/updates" element={<PrivateRoute />}>
          <Route path="/updates" element={<Updates />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
