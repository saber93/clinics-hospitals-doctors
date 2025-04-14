import React, { Suspense } from 'react';
import HeroSection from '@/components/hospitals/HeroSection';
import HospitalFilters from '@/components/hospitals/HospitalFilters';
import HospitalFeatures from '@/components/hospitals/HospitalFeatures';
import TestimonialsSection from '@/components/hospitals/TestimonialsSection';
import HospitalsHeader from '@/components/hospitals/HospitalsHeader';
import HospitalsListView from '@/components/hospitals/HospitalsListView';
import { useHospitalsList } from '@/hooks/useHospitalsList';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

// Custom error boundary component
class HospitalsErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean, error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Hospitals page error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Something went wrong loading the hospitals page. Please try refreshing the page.
              <br />
              <code className="text-xs bg-gray-100 p-1 rounded mt-2 block">
                {this.state.error?.message || "Unknown error"}
              </code>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading component for hospitals
const HospitalsLoading = () => (
  <div className="min-h-screen bg-gray-50">
    {/* Added margin-top to push hero section below the navbar */}
    <div className="mt-16">
      <HeroSection />
    </div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <HospitalsHeader />
      <LoadingSpinner message="Loading hospitals..." />
    </div>
  </div>
);

const Hospitals = () => {
  try {
    const {
      searchTerm,
      setSearchTerm,
      categoryFilter,
      setCategoryFilter,
      offerFilter,
      setOfferFilter,
      sortBy,
      setSortBy,
      viewMode,
      setViewMode,
      filteredHospitals,
      visibleHospitals,
      hasMore,
      categories,
      clearFilters,
      loadMoreHospitals
    } = useHospitalsList({ initialPageSize: 9 });

    return (
      <HospitalsErrorBoundary>
        <div className="min-h-screen bg-gray-50">
          {/* Added margin-top to push hero section below the navbar */}
          <div className="mt-16">
            <HeroSection />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <HospitalsHeader />
            
            <HospitalFilters 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              offerFilter={offerFilter}
              setOfferFilter={setOfferFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              categories={categories}
            />
            
            <Suspense fallback={<LoadingSpinner message="Loading hospitals..." />}>
              <HospitalsListView
                visibleHospitals={visibleHospitals}
                filteredHospitals={filteredHospitals}
                viewMode={viewMode}
                setViewMode={setViewMode}
                clearFilters={clearFilters}
                hasMore={hasMore}
                loadMoreHospitals={loadMoreHospitals}
              />
            </Suspense>
          </div>
          
          {/* Features and Testimonials sections */}
          <HospitalFeatures />
          <TestimonialsSection />
        </div>
      </HospitalsErrorBoundary>
    );
  } catch (error) {
    console.error("Error rendering Hospitals page:", error);
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mt-16">
          <HeroSection />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              There was a problem loading the hospitals. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }
};

export default Hospitals;
