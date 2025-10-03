import { useState } from "react";
import { motion } from "framer-motion";
import { PhoneInput } from "@/components/auth/PhoneInput";
import { OTPInput } from "@/components/auth/OTPInput";
import { Sparkles } from "lucide-react";

const Login = () => {
  const [step, setStep] = useState<"phone" | "otp">("phone");

  return (
    <div className="min-h-screen gradient-subtle flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card border border-border rounded-2xl shadow-lg p-8 space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center shadow-glow"
            >
              <Sparkles className="h-8 w-8 text-white" />
            </motion.div>
          </div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center space-y-2"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              {step === "phone"
                ? "Enter your phone number to continue"
                : "Enter the verification code sent to your phone"}
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: step === "phone" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: step === "phone" ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center"
          >
            {step === "phone" ? <PhoneInput /> : <OTPInput />}
          </motion.div>

          {/* Toggle step (for demo purposes) */}
          <div className="text-center">
            <button
              onClick={() => setStep(step === "phone" ? "otp" : "phone")}
              className="text-xs text-muted-foreground hover:text-foreground transition-smooth"
            >
              {step === "phone" ? "Already have OTP?" : "Back to phone input"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
