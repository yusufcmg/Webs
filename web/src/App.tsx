import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Post from "./pages/Post";
import Project from './pages/Project';
import AllPosts from './pages/AllPosts';     // Yeni: AllPosts sayfasını import ettik
import AllProjects from './pages/AllProjects'; // Yeni: AllProjects sayfasını import ettik

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/project/:projectId" element={<Project />} />
          <Route path="/blog/all" element={<AllPosts />} />     {/* Yeni: Tüm Yazılar rotası */}
          <Route path="/projects/all" element={<AllProjects />} /> {/* Yeni: Tüm Projeler rotası */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;