import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import placeholderImage from '../assets/placeholder.jpg';

type CustomNodeProps = {
  data: {
    label: string;
    imageUrl?: string;
  };
};

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  const [imgSrc, setImgSrc] = useState(data.imageUrl || placeholderImage);

  return (
    <div className="w-44 bg-black border border-gray-800 rounded-lg overflow-hidden">
      <div className="relative">
        <div className="w-full h-52 overflow-hidden">
          <img
            src={imgSrc}
            alt={`Character ${data.label}`}
            className="h-full w-full object-cover object-center transition-opacity duration-300 group-hover:opacity-80"
            onError={() => setImgSrc(placeholderImage)}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70 group-hover:opacity-50"></div>
      </div>
      <div className="group p-1 text-center">
        <h3 className="text-lg font-bold text-yellow-400 tracking-wider truncate transition-all duration-300 ease-in-out group-hover:whitespace-normal group-hover:overflow-visible">
          {data.label}
        </h3>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="bg-blue-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="bg-blue-500"
      />
    </div>
  );
};

export default CustomNode;
