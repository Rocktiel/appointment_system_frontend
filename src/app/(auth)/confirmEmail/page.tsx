import ConfirmEmail from "@/components/auth/confirmEmail/ConfirmEmail";
import { Suspense } from "react";
const ConfirmEmailPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-14rem)] flex items-center justify-center p-4">
      <Suspense fallback={<>Loading...</>}>
        <ConfirmEmail />
      </Suspense>
    </div>
  );
};

export default ConfirmEmailPage;
