import { Suspense } from "react";
import LoginPageContent from "@/components/auth/login/LoginPageContent";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <LoginPageContent />
    </Suspense>
  );
};

export default LoginPage;
