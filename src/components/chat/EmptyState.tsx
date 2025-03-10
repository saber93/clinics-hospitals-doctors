
import React from 'react';
import { MessageSquare } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-8">
      <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-medium mb-2">No chat sessions found</h3>
      <p className="text-sm text-gray-500 mb-4">
        You haven't started any chat sessions yet.
      </p>
    </div>
  );
};

export default EmptyState;
