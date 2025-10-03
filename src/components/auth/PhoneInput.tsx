import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const countryCodes = [
  { code: "+1", country: "US" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "IN" },
  { code: "+86", country: "CN" },
];

export function PhoneInput() {
  const [selectedCode, setSelectedCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }
    setError("");
    // Placeholder - would trigger OTP flow
    console.log("Phone submitted:", selectedCode + phone);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Phone Number</label>
        <div className="flex gap-2">
          <select
            value={selectedCode}
            onChange={(e) => setSelectedCode(e.target.value)}
            className="h-11 w-24 rounded-lg border border-input bg-card px-3 text-sm transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {countryCodes.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code}
              </option>
            ))}
          </select>
          <div className="relative flex-1">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="tel"
              placeholder="123 456 7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              className="pl-10"
              maxLength={15}
            />
          </div>
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
      <Button type="submit" className="w-full" variant="gradient" size="lg">
        Continue
      </Button>
    </form>
  );
}
