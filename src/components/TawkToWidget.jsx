"use client";
import { useEffect } from 'react';

const TawkToWidget = () => {
  useEffect(() => {
    // Replace with your Tawk.to property ID and widget ID
    const TAWK_PROPERTY_ID = 'YOUR_PROPERTY_ID'; // e.g., '5f8a1234567890abcdef1234'
    const TAWK_WIDGET_ID = 'YOUR_WIDGET_ID'; // e.g., 'default'

    // Load Tawk.to script
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    }

    // Cleanup
    return () => {
      // Remove Tawk.to widget on unmount
      const tawkWidget = document.getElementById('tawkId');
      if (tawkWidget) {
        tawkWidget.remove();
      }
    };
  }, []);

  return null;
};

export default TawkToWidget;
