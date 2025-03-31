import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import BlogEditor from "./pages/BlogEditor";
import Dashboard from "./pages/Dashboard";
import BlogPost from "./pages/BlogPost";
import Tags from "./pages/Tags";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/editor" element={<BlogEditor />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/tags/:tag" element={<Tags />} />
      </Routes>
    </Router>
  );
}

export default App;
