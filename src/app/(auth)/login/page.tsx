import LoginForm from "@/components/auth/login/LoginForm";
import { LogIn } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="min-h-[calc(100vh-14rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-700 dark:to-amber-900 items-center justify-center p-8 text-white">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Tekrar Hoş Geldiniz!</h2>
            <p className="text-lg opacity-90">
              Devam etmek için giriş yapın ve randevularınızı en kolay şekilde
              yönetin.
            </p>
            <div className="mt-6">
              <LogIn className="h-20 w-20 mx-auto opacity-70" />
            </div>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
