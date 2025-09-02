"use client";
import React, { useState, useEffect, useRef } from 'react';

// Reusable Icon Component
const Icon = ({ name, className }) => {
  const icons = {
    camera: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>,
    instagram: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
    chevronLeft: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="15 18 9 12 15 6"></polyline></svg>,
    chevronRight: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 18 15 12 9 6"></polyline></svg>,
    linkedin: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
    video: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>,
    news: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
  };
  return icons[name] || null;
};

// Looping Carousel Component
const Carousel = ({ images, isInstagram = false }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef(null);
  const itemsPerView = 3;

  if (!images || images.length < itemsPerView) {
    // Handle cases with fewer images than itemsPerView
    return (
      <div className="flex justify-center gap-4">
        {images.map(post => (
          <div key={post.id} className="w-1/3 flex-shrink-0 px-2">
            <a href={isInstagram ? post.postUrl : undefined} target={isInstagram ? "_blank" : undefined} rel={isInstagram ? "noopener noreferrer" : undefined} className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative">
              <img src={post.src} alt={post.caption} className="w-full h-auto object-cover aspect-square" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm">{post.caption}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    );
  }

  const loopedImages = [
    ...images.slice(images.length - itemsPerView),
    ...images,
    ...images.slice(0, itemsPerView)
  ].map((img, index) => ({ ...img, uniqueKey: `${img.id}-${index}` }));

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => goToNext(), 4000);
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(images.length);
    } else if (currentIndex === images.length + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      setTimeout(() => setIsTransitioning(true), 50);
    }
  }, [isTransitioning]);

  const goToNext = () => setCurrentIndex(prev => prev + 1);
  const goToPrevious = () => setCurrentIndex(prev => prev - 1);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {loopedImages.map((post) => (
            <div key={post.uniqueKey} className="w-1/3 flex-shrink-0 px-2">
              <a href={isInstagram ? post.postUrl : undefined} target={isInstagram ? "_blank" : undefined} rel={isInstagram ? "noopener noreferrer" : undefined} className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative">
                <img src={post.src} alt={post.caption} className="w-full h-auto object-cover aspect-square" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm">{post.caption}</p>
                </div>
              </a>
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

// Helper to extract YouTube video ID
const getYouTubeEmbedUrl = (url) => {
  let videoId = '';
  const urlObj = new URL(url);
  if (urlObj.hostname === 'youtu.be') {
    videoId = urlObj.pathname.slice(1);
  } else if (urlObj.hostname.includes('youtube.com')) {
    videoId = urlObj.searchParams.get('v');
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

// Main Page Component
export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [galleryRes, instaRes, videoRes, articleRes] = await Promise.all([
          fetch('/api/gallery-images'),
          fetch('/api/instagram-posts'),
          fetch('/api/video-testimonials'),
          fetch('/api/news-articles')
        ]);
        setGalleryImages(await galleryRes.json());
        setInstagramPosts(await instaRes.json());
        setVideos(await videoRes.json());
        setArticles(await articleRes.json());
      } catch (error) {
        console.error("Failed to fetch gallery data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white font-sans">
      <main>
        {/* Our Gallery Section */}
        <section className="py-20 text-center bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className='flex items-center justify-center'>
              <div className="inline-block p-4 bg-orange-100 rounded-full mx-3 shadow-sm">
                <Icon name="camera" className="h-10 w-10 text-orange-500" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Our Gallery</h1>
            </div>
            <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg">
              A collection of moments, stories, and milestones from our journey.
            </p>
          </div>
        </section>

        {/* New Gallery Carousel */}
        <section className="pb-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? <div className="text-center">Loading gallery...</div> : <Carousel images={galleryImages} />}
          </div>
        </section>

        {/* Follow Our Journey Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className='flex items-center justify-center'>
                <div className="inline-block p-3 bg-red-100 rounded-full mx-3">
                  <Icon name="instagram" className="h-8 w-8 text-red-500" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Follow Our Journey</h2>
              </div>
              <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                Glimpses from our work, updated regularly from our Instagram feed.
              </p>
            </div>
            {isLoading ? <div className="text-center">Loading Instagram posts...</div> : <Carousel images={instagramPosts} isInstagram={true} />}
            <div className='flex justify-center mt-8 gap-4'>
              <a href="https://www.instagram.com/tejosuryafoundation/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center w-fit">
                <Icon name="instagram" className="h-5 w-5 mr-2" />
                Follow on Instagram
              </a>
              <a href="https://www.linkedin.com/company/tejo-surya-charitable-foundation/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center w-fit">
                <Icon name="linkedin" className="h-5 w-5 mr-2" />
                Follow on LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Video Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className='flex items-center justify-center'>
              <div className="inline-block p-3 bg-red-100 rounded-full mx-3">
                <Icon name="video" className="h-8 w-8 text-red-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Video Testimonials</h2>
            </div>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
              Watch powerful stories shared by our beneficiaries and partners.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {isLoading ? <p>Loading videos...</p> : videos.length > 0 ? videos.map(video => (
                <div key={video.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <iframe
                      src={getYouTubeEmbedUrl(video.youtubeUrl)}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-lg"
                    ></iframe>
                  </div>
                  <h3 className="font-bold text-lg">{video.title}</h3>
                  <p className="text-gray-600 text-sm">{video.description}</p>
                </div>
              )) : <p className="col-span-2 text-gray-500">Video testimonials coming soon...</p>}
            </div>
          </div>
        </section>

        {/* In The News Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center">
              <div className="inline-block p-3 bg-blue-100 rounded-full mx-3">
                <Icon name="news" className="h-8 w-8 text-blue-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">In The News</h2>
            </div>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
              Media coverage of our work and initiatives.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? <p>Loading articles...</p> : articles.length > 0 ? articles.map(article => (
                <a key={article.id} href={article.articleUrl} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-md overflow-hidden group">
                  <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{article.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{article.source}</p>
                  </div>
                </a>
              )) : <p className="col-span-3 text-gray-500">News features coming soon...</p>}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

