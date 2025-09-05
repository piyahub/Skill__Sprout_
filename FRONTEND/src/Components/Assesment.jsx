import React, { useState } from 'react';

const Assesment = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="pt-16 relative w-full min-h-[calc(100vh-4rem)]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="w-12 h-12 border-4 border-t-4 border-white border-solid rounded-full animate-spin sm:w-10 sm:h-10 xs:w-8 xs:h-8"></div>
        </div>
      )}
      <div className="w-full h-[calc(100vh-4rem)] overflow-y-auto">
        <iframe
          src="https://mockquiz.lovable.app/"
          title="Mock Quiz Assessment"
          className="w-full h-full border-none"
          style={{ minHeight: '600px' }}
          allowFullScreen
          onLoad={handleIframeLoad}
        />
      </div>
      <style>{`
        @media (max-width: 640px) {
          iframe {
            min-height: 700px; /* Increased min-height for mobile to show heading and buttons */
          }
          .pt-16 {
            padding-top: 4rem;
          }
          .h-[calc(100vh-4rem)] {
            height: calc(100vh - 4rem); /* Ensure full height */
          }
        }
        @media (max-width: 480px) {
          iframe {
            min-height: 750px; /* Further increase for very small screens */
          }
          .pt-16 {
            padding-top: 3rem;
          }
          .h-[calc(100vh-4rem)] {
            height: calc(100vh - 3rem);
          }
        }
        iframe {
          max-width: 100%;
          overflow: hidden;
        }
        .overflow-y-auto {
          -webkit-overflow-scrolling: touch; /* Smooth scrolling on mobile */
        }
      `}</style>
    </div>
  );
};

export default Assesment;