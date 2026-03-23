// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./components/About";
import Contact from "./pages/Contact";
import WhoWeAre from "./pages/WhoWeAre/WhoWeAre";
import Sector from "./pages/Sector";
import News from "./pages/News/News";
import Careers from "./pages/Careers";
import Services from "./pages/Services/Services";
import Timeline from "./pages/WhoWeAre/History/Timeline";
import LogIn from "./pages/LogIn";
import Blog from "./pages/News/Blog/Blog";
import CaseStudy from "./pages/News/CaseStudy/CaseStudy";
import MediaAward from "./pages/News/MediaAward/MediaAward";
import Register from "./pages/Register";
import SingleBlogPost from "./pages/SingleBlogPost";
import AdminDashboard from './components/AdminDashboard';
import PrivacyPolicy from "./pages/PrivacyPolicy";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/who-we-are" element={<WhoWeAre/>}/>
        <Route path="/sector" element={<Sector/>}/>
        <Route path="/news" element={<News/>}/>
        <Route path="/careers/openings" element={<Careers/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/who-we-are/history/timeline" element={<Timeline/>}/>
        <Route path="/news/blog" element={<Blog/>}/>
        <Route path="/news/blog/:id" element={<SingleBlogPost/>}/>
        <Route path="/news/case-studies" element={<CaseStudy/>}/>
        <Route path="/news/media-award" element={<MediaAward/>}/>
        <Route path="/contact/reach-us" element={<Contact/>}/>
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/contact/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </div>
  );
}
