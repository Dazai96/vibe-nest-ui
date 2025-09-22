import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { LoadingSpinner } from "@/components/ui/skeleton-loaders";

// Lazy load pages for better performance
const Feed = lazy(() => import("./pages/Feed"));
const Communities = lazy(() => import("./pages/Communities"));
const Mood = lazy(() => import("./pages/Mood"));
const Resources = lazy(() => import("./pages/Resources"));
const Profile = lazy(() => import("./pages/Profile"));
const ProfileSettings = lazy(() => import("./pages/ProfileSettings"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Missions = lazy(() => import("./pages/Missions"));
const Settings = lazy(() => import("./pages/Settings"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Therapists = lazy(() => import("./pages/Therapists"));
const Friends = lazy(() => import("./pages/Friends"));
const Auth = lazy(() => import("./pages/Auth"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const PageLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center space-y-4">
      <LoadingSpinner size="lg" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <TooltipProvider>
            <HelmetProvider>
              <Helmet>
                <title>Vibenest - Mental Health Community for Students</title>
                <meta name="description" content="Join Vibenest, a supportive mental health community where students connect, share experiences, and find professional resources." />
                <meta name="keywords" content="mental health, student support, community, therapy, counseling, peer support" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="Vibenest - Mental Health Community" />
                <meta property="og:description" content="A supportive space for students to connect and find mental health resources" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="canonical" href="https://vibenest.app" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
              </Helmet>
              
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <div className="min-h-screen bg-background transition-colors duration-300">
                  <Suspense fallback={<PageLoadingFallback />}>
                    <Routes>
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/onboarding" element={<Onboarding />} />
                      <Route path="/" element={
                        <ProtectedRoute>
                          <MainLayout>
                            <Feed />
                          </MainLayout>
                        </ProtectedRoute>
                      } />
                      <Route path="/communities" element={
                        <ProtectedRoute>
                          <MainLayout>
                            <Communities />
                          </MainLayout>
                        </ProtectedRoute>
                      } />
                      <Route path="/mood" element={
                        <ProtectedRoute>
                          <MainLayout>
                            <Mood />
                          </MainLayout>
                        </ProtectedRoute>
                      } />
                      <Route path="/resources" element={
                        <ProtectedRoute>
                          <MainLayout>
                            <Resources />
                          </MainLayout>
                        </ProtectedRoute>
                      } />
                      <Route path="/profile" element={
                        <ProtectedRoute>
                          <MainLayout>
                            <Profile />
                          </MainLayout>
                        </ProtectedRoute>
                      } />
                      <Route path="/profile/settings" element={
                        <ProtectedRoute>
                          <MainLayout>
                            <ProfileSettings />
                          </MainLayout>
                        </ProtectedRoute>
                      } />
                      <Route path="/leaderboard" element={
                        <ProtectedRoute>
                          <MainLayout>
                            <Leaderboard />
                          </MainLayout>
                        </ProtectedRoute>
                      } />
                      <Route path="/missions" element={
                        <ProtectedRoute>
                          <MainLayout>
                            <Missions />
                          </MainLayout>
                        </ProtectedRoute>
                      } />
                      <Route path="/settings" element={
                        <ProtectedRoute>
                          <MainLayout>
                            <Settings />
                          </MainLayout>
                        </ProtectedRoute>
                      } />
                      <Route path="/admin" element={
                        <ProtectedRoute>
                          <MainLayout>
                            <AdminDashboard />
                          </MainLayout>
                        </ProtectedRoute>
                      } />
                      <Route path="/therapists" element={
                        <ProtectedRoute>
                          <MainLayout>
                            <Therapists />
                          </MainLayout>
                        </ProtectedRoute>
                      } />
                      <Route path="/friends" element={
                        <ProtectedRoute>
                          <MainLayout>
                            <Friends />
                          </MainLayout>
                        </ProtectedRoute>
                      } />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </div>
              </BrowserRouter>
            </HelmetProvider>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
