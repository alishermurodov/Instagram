import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

const PreviewComponent = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      {children}
      {isHovered && (
        <div className="absolute inset-0  flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white space-y-1">
            <p><FavoriteIcon /> 10</p>
            <p><CommentIcon /> 10</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default PreviewComponent