import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Layout from './components/Layout/Layout';
import LoadingScreen from './components/common/LoadingScreen';
import Login from './pages/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { UserRole } from './types/auth';

// Lazy load pages to improve initial load time
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

// Teacher pages
const ResourceRequests = React.lazy(() => import('./pages/teacher/ResourceRequests'));
const LabBooking = React.lazy(() => import('./pages/teacher/LabBooking'));

// Lab Technician pages
const LabManagement = React.lazy(() => import('./pages/labTechnician/LabManagement'));
const BookedSessions = React.lazy(() => import('./pages/labTechnician/BookedSessions'));

// Storekeeper pages
const InventoryManagement = React.lazy(() => import('./pages/storekeeper/InventoryManagement'));
const MaterialAllocation = React.lazy(() => import('./pages/storekeeper/MaterialAllocation'));
const ExerciseBooks = React.lazy(() => import('./pages/storekeeper/ExerciseBooks'));
const ClassBooks = React.lazy(() => import('./pages/storekeeper/ClassBooks'));

// Librarian pages
const LibraryManagement = React.lazy(() => import('./pages/librarian/LibraryManagement'));
const BookLoans = React.lazy(() => import('./pages/librarian/BookLoans'));
const TextbookAssignment = React.lazy(() => import('./pages/librarian/TextbookAssignment'));
const ReturnedBooks = React.lazy(() => import('./pages/librarian/ReturnedBooks'));

// Admin pages
const UserManagement = React.lazy(() => import('./pages/admin/UserManagement'));
const Reports = React.lazy(() => import('./pages/admin/Reports'));
const StockControl = React.lazy(() => import('./pages/admin/StockControl'));
const OrderManagement = React.lazy(() => import('./pages/admin/OrderManagement'));

// Error and utility pages
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Profile = React.lazy(() => import('./pages/Profile'));

const App: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/login" element={
          !isAuthenticated 
            ? <Login /> 
            : <Navigate to="/dashboard" replace />
        } />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            {/* Common routes for all users */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Teacher routes */}
            <Route element={<ProtectedRoute allowedRoles={[UserRole.TEACHER, UserRole.ADMIN]} />}>
              <Route path="/resource-requests" element={<ResourceRequests />} />
              <Route path="/lab-booking" element={<LabBooking />} />
            </Route>
            
            {/* Lab Technician routes */}
            <Route element={<ProtectedRoute allowedRoles={[UserRole.LAB_TECHNICIAN, UserRole.ADMIN]} />}>
              <Route path="/lab-management" element={<LabManagement />} />
              <Route path="/booked-sessions" element={<BookedSessions />} />
            </Route>
            
            {/* Storekeeper routes */}
            <Route element={<ProtectedRoute allowedRoles={[UserRole.STOREKEEPER, UserRole.ADMIN]} />}>
              <Route path="/inventory" element={<InventoryManagement />} />
              <Route path="/material-allocation" element={<MaterialAllocation />} />
              <Route path="/exercise-books" element={<ExerciseBooks />} />
              <Route path="/class-books" element={<ClassBooks />} />
            </Route>
            
            {/* Librarian routes */}
            <Route element={<ProtectedRoute allowedRoles={[UserRole.LIBRARIAN, UserRole.ADMIN]} />}>
              <Route path="/library" element={<LibraryManagement />} />
              <Route path="/book-loans" element={<BookLoans />} />
              <Route path="/textbooks" element={<TextbookAssignment />} />
              <Route path="/returned-books" element={<ReturnedBooks />} />
            </Route>
            
            {/* Admin routes */}
            <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}>
              <Route path="/users" element={<UserManagement />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/stock-control" element={<StockControl />} />
              <Route path="/orders" element={<OrderManagement />} />
            </Route>
          </Route>
        </Route>
        
        {/* Handle root path */}
        <Route path="/" element={
          isAuthenticated 
            ? <Navigate to="/dashboard" replace />
            : <Navigate to="/login" replace />
        } />
        
        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
