
import React from "react";

const TestCredentialsDisplay = () => {
  return (
    <div className="mt-4 text-center text-sm">
      <p className="text-gray-600">Test Credentials:</p>
      <div className="mt-2 p-3 bg-gray-50 rounded text-left space-y-1">
        <p><strong>Admin:</strong> admin@skinnect.com / Admin123!</p>
        <p><strong>Vendor:</strong> vendor@skinnect.com / Vendor123!</p>
        <p><strong>Doctor:</strong> dr-mix@skinnect.com / Doctor123!</p>
        <p><strong>Client:</strong> client@skinnect.com / Client123!</p>
      </div>
    </div>
  );
};

export default TestCredentialsDisplay;
