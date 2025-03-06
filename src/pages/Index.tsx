
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 skinnect-gradient bg-clip-text text-transparent">Skinnect</h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with top skin and body care specialists in your area
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="skinnect-button-primary">
                <Link to="/auth?mode=login">Login</Link>
              </Button>
              <Button asChild className="skinnect-button-outline">
                <Link to="/auth?mode=register">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="skinnect-card">
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-12 h-12 mx-auto mb-4">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M16 8h.01" />
                  <path d="M8 16h.01" />
                  <path d="M12 12h.01" />
                  <path d="M8 8h.01" />
                  <path d="M16 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Book appointments with your favorite specialists with just a few clicks.</p>
            </div>
            <div className="skinnect-card">
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-12 h-12 mx-auto mb-4">
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Special Offers</h3>
              <p className="text-gray-600">Get access to exclusive deals and promotions from top clinics.</p>
            </div>
            <div className="skinnect-card">
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-12 h-12 mx-auto mb-4">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Digital Vouchers</h3>
              <p className="text-gray-600">Easily redeem and manage your vouchers and promo codes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to experience the best in skin care?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of happy clients who have transformed their skin and body care routine.
          </p>
          <Button asChild size="lg" className="skinnect-button-primary">
            <Link to="/auth?mode=register">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
