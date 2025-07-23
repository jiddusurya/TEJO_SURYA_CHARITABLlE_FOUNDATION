"use client";
import React from 'react';
import { useState, useEffect, useRef } from 'react';

// Helper component for Icons using inline SVGs
const Icon = ({ name, className }) => {
  const icons = {
    camera: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>,
    instagram: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
    chevronLeft: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="15 18 9 12 15 6"></polyline></svg>,
    chevronRight: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 18 15 12 9 6"></polyline></svg>,
  };
  return icons[name] || null;
};

// Looping Carousel Component
const Carousel = ({ images, duration = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);
  const itemsPerView = 3;

  if (!images || images.length === 0) {
    return <div className="text-center p-8 text-gray-500">No posts to display.</div>;
  }

  // Clone first and last elements for seamless loop
  const loopedImages = [
      ...images.slice(images.length - itemsPerView), 
      ...images, 
      ...images.slice(0, itemsPerView)
  ];

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (!isPaused) {
      timeoutRef.current = setTimeout(() => {
        goToNext();
      }, duration);
    }
    return () => {
      resetTimeout();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isPaused]);

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(images.length);
    } else if (currentIndex === images.length + itemsPerView) {
      setIsTransitioning(false);
      setCurrentIndex(itemsPerView);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
    }
  }, [isTransitioning]);

  const goToPrevious = () => {
    if (!isTransitioning) return;
    setCurrentIndex(prevIndex => prevIndex - 1);
  };

  const goToNext = () => {
    if (!isTransitioning) return;
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  return (
    <div 
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
    >
        <div className="overflow-hidden">
            <div 
                className="flex"
                style={{ 
                    width: `${(100 / itemsPerView) * loopedImages.length}%`,
                    transform: `translateX(-${currentIndex * (100 / loopedImages.length)}%)`,
                    transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none',
                }}
                onTransitionEnd={handleTransitionEnd}
            >
                {loopedImages.map((post, index) => (
                    <div key={index} className="w-full px-4" style={{ flexBasis: `${100 / loopedImages.length}%` }}>
                        <div className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative">
                            <img src={post.src} alt={`Gallery Image ${post.id}`} className="w-full h-auto object-cover aspect-square" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <p className="text-white text-sm">{post.caption}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <button onClick={goToPrevious} className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10">
            <Icon name="chevronLeft" className="h-6 w-6 text-gray-700" />
        </button>
        <button onClick={goToNext} className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10">
            <Icon name="chevronRight" className="h-6 w-6 text-gray-700" />
        </button>
    </div>
  );
};


// Main Page Component
export default function GalleryPage() {
  const fallbackPosts = [
    { id: 1, src: "https://placehold.co/600x600/f87171/ffffff?text=Post+1", caption: "Empowering communities, one session at a time. #menstrualhealth #education" },
    { id: 2, src: "https://placehold.co/600x600/fb923c/ffffff?text=Post+2", caption: "Our amazing volunteers making a difference. Join us! #volunteer #community" },
    { id: 3, src: "https://placehold.co/600x600/fbbf24/ffffff?text=Post+3", caption: "Distributing hygiene kits to those in need. #hygienekits #empowerment" },
    { id: 4, src: "https://placehold.co/600x600/a3e635/ffffff?text=Post+4", caption: "Knowledge is power. An interactive session with students. #awareness #youth" },
    { id: 5, src: "https://placehold.co/600x600/4ade80/ffffff?text=Post+5", caption: "Breaking the silence and stigma around menstruation. #endstigma #periodpoverty" },
    { id: 6, src: "https://placehold.co/600x600/34d399/ffffff?text=Post+6", caption: "A successful workshop with local health workers. #collaboration #impact" },
  ];

  const [instagramPosts, setInstagramPosts] = useState(fallbackPosts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      setIsLoading(true);
      try {
        // This fetch call assumes you have an API route at /api/instagram
        const response = await fetch('/api/instagram');
        if (!response.ok) {
          throw new Error('Failed to fetch from API');
        }
        const data = await response.json();
        setInstagramPosts(data);
      } catch (error) {
        console.error("Failed to fetch Instagram posts, using fallback data:", error);
        // If the API fails, the component will use the fallbackPosts
        setInstagramPosts(fallbackPosts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstagramPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const galleryImages = [
    { id: 1, src: "https://theeinsteinbrains.com/wp-content/uploads/2023/06/Mask-group.png", caption: "Community workshop on menstrual hygiene." },
    { id: 2, src: "https://theeinsteinbrains.com/wp-content/uploads/2023/06/Mask-group-1.png", caption: "Celebrating World Menstrual Hygiene Day." },
    { id: 3, src: "https://theeinsteinbrains.com/wp-content/uploads/2023/06/Mask-group-3.png", caption: "Our team distributing sanitary pads in a rural school." },
    { id: 4, src: "https://theeinsteinbrains.com/wp-content/uploads/2023/06/Mask-group-4.png", caption: "An engaging session with adolescent girls." },
    { id: 5, src: "https://theeinsteinbrains.com/wp-content/uploads/2023/06/Mask-group-5.png", caption: "Honored to have local health officials join our event." },
    { id: 6, src: "https://theeinsteinbrains.com/wp-content/uploads/2023/06/Mask-group-6.png", caption: "Volunteers preparing hygiene kits for distribution." },
  ];

  return (
      <div className="bg-white font-sans">
        <main>
          {/* Our Gallery Section */}
          <section className="py-20 text-center bg-white">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="inline-block p-4 bg-orange-100 rounded-full mb-6 shadow-sm">
                      <Icon name="camera" className="h-10 w-10 text-orange-500" />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Our Gallery</h1>
                  <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg">
                      A collection of moments, stories, and milestones. See our mission in action through photos, videos, and press features.
                  </p>
              </div>
          </section>

          {/* New Gallery Carousel */}
          <section className="pb-20 bg-white">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <Carousel images={galleryImages} />
              </div>
          </section>

          {/* Follow Our Journey Section */}
          <section className="py-20 bg-gray-50">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                      <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
                          <Icon name="instagram" className="h-8 w-8 text-red-500" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Follow Our Journey</h2>
                      <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                          Glimpses from our work, updated regularly from our Instagram feed.
                      </p>
                  </div>
                  
                  {isLoading ? (
                    <div className="text-center text-gray-500">Loading Instagram posts...</div>
                  ) : (
                    <Carousel images={instagramPosts} />
                  )}

                  <div className="text-center mt-16">
                      <a href="https://www.instagram.com/tejosuryafoundation/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto w-fit">
                          <Icon name="instagram" className="h-5 w-5 mr-2" />
                          Follow us on Instagram
                      </a>
                  </div>
              </div>
          </section>

          {/* Video Testimonials Section */}
          <section className="py-20 bg-white">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Video Testimonials</h2>
                  <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                      Watch powerful stories shared by our beneficiaries and partners
                  </p>
                  <div className="mt-12 min-h-[30vh] flex items-center justify-center bg-gray-100 rounded-2xl">
                      <p className="text-gray-400">Video testimonials coming soon...</p>
                  </div>
              </div>
          </section>

          {/* In The News Section */}
          <section className="py-20 bg-gray-50">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800">In The News</h2>
                  <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                      Media coverage of our work and initiatives.
                  </p>
                  <div className="mt-12 min-h-[30vh] flex items-center justify-center bg-white rounded-2xl border border-gray-200">
                       <p className="text-gray-400">News features coming soon...</p>
                  </div>
              </div>
          </section>
        </main>
      </div>
  );
}
