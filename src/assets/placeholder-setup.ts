// Placeholder images for development
// You can replace these with actual image files later

// Create placeholder image data URLs
const createPlaceholderImage = (width: number, height: number, text: string) => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="#e5e7eb"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle" dy=".3em">${text}</text>
    </svg>
  `)}`;
};

// Export placeholder images that match the Figma asset imports
export const placeholderImages = {
  'b51fcd234b4a05b7b08f2594af182e2683d6666b': createPlaceholderImage(200, 150, 'Image 1'),
  '286b078f3a1c614ebe5e943e0c53a7fd996b174c': createPlaceholderImage(200, 150, 'Options')
};

// Create actual files for the imports to work
export default placeholderImages;