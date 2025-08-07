import React from "react";
import RegisterForm from "./RegisterForm";

const RegisterPageContent = () => {
  return (
    <div className="min-h-[calc(100vh-14rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-700 dark:to-blue-900 items-center justify-center p-8 text-white">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Hemen Katılın!</h2>
            <p className="text-lg opacity-90">
              Hesabınızı oluşturarak hizmetlerimizden hemen faydalanmaya
              başlayın.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPageContent;
