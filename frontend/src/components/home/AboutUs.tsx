export function AboutUs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900">
              Your Trusted Journey Partners
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              With years of experience in the transportation industry, we've
              built a reputation for reliability, safety, and customer
              satisfaction.
            </p>
            <div className="mt-8 space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white">
                    ✓
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Island-wide Coverage
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Connecting all major cities and towns across Sri Lanka
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white">
                    ✓
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Modern Fleet
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Well-maintained buses with comfortable seating and amenities
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                className="w-full h-96 object-cover"
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Bus service"
              />
              <div className="absolute inset-0 bg-black opacity-20"></div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-4xl font-extrabold text-blue-600">460+</h3>
            <p className="mt-2 text-lg text-gray-600">Active Drivers</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-4xl font-extrabold text-blue-600">90%</h3>
            <p className="mt-2 text-lg text-gray-600">Happy Clients</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-4xl font-extrabold text-blue-600">15+</h3>
            <p className="mt-2 text-lg text-gray-600">Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
}
