import React from "react";
import { COUNTRY_PHONE_PATTERNS } from "../lib/phoneCountries";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface PhoneInputProps {
  phone: string;
  countryCode: string;
  onPhoneChange: (val: string) => void;
  onCountryChange: (val: string) => void;
  error?: string;
  required?: boolean;
}

export function PhoneInput({ phone, countryCode, onPhoneChange, onCountryChange, error, required }: PhoneInputProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted-foreground">
        Numéro de téléphone
      </span>
      <div className="flex gap-2 w-full">
        <Select value={countryCode} onValueChange={onCountryChange}>
          <SelectTrigger 
            className={`shrink-0 w-[110px] h-auto rounded-xl border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-primary/60'} bg-white/[0.03] px-3 py-3 text-base text-foreground outline-none transition focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_oklch(0.92_0.22_130/0.15)]`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="bottom" avoidCollisions={false} className="z-[200] border-white/10 bg-[#0f1115] text-white">
            {Object.entries(COUNTRY_PHONE_PATTERNS).map(([code, info]) => (
              <SelectItem key={code} value={code} className="focus:bg-white/10 focus:text-white cursor-pointer">
                {info.flag} {info.dial}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <input
          type="tel"
          value={phone}
          required={required}
          placeholder="+1 (555) 019-2834"
          onChange={(e) => onPhoneChange(e.target.value)}
          className={`flex-1 min-w-0 rounded-xl border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-primary/60'} bg-white/[0.03] px-4 py-3 text-base text-foreground outline-none transition focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_oklch(0.92_0.22_130/0.15)]`}
        />
      </div>
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}
