        {/* Places Nearby Section */}
        <section id="places-nearby" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#4A573B] mb-6 font-garamond">
                Places Nearby
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-rotunda">
                Discover the convenience of having essential services, shopping, dining, and educational institutions just minutes away from your future home.
              </p>
            </motion.div>

            {/* Places Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyPlaces.map((place, index) => {
                const IconComponent = place.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 p-3 rounded-full bg-gray-100 ${place.color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#4A573B] mb-1 font-garamond">
                          {place.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 font-rotunda">
                          {place.category}
                        </p>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-[#DA743F] mr-1" />
                          <span className="text-[#DA743F] font-rotunda">
                            {place.distance}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default LotsPage;