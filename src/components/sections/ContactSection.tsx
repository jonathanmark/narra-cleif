import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Card } from "../ui/card";
import {
  AlertCircle,
  CheckCircle,
  ExternalLink,
  MapPin,
  ChevronRight,
  Phone,
} from "lucide-react";
import {
  philippinesProvinces,
  philippinesCities,
} from "../constants/location-data";
import { toast } from "sonner@2.0.3";
import mountainLandscape from "figma:asset/849a218492e16cbee4645dc827d3dc4e86118c11.png";

interface ContactSectionProps {
  onNavigateToLots?: () => void;
  onNavigateToContact?: () => void;
}

export function ContactSection({
  onNavigateToLots,
  onNavigateToContact,
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "Philippines",
    province: "",
    city: "",
    lotInterest: "",
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error" | "fallback"
  >("idle");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  // Google Apps Script Web App URL (Production)
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyIyUvMNbajq2nj73HrXI_vTMRzuL4HqwP3AjkWmoOUoSnsJozGi0MtFzI_tPeCLcyS-g/exec";

  // Google Form URL as a backup (you can create this easily)
  const GOOGLE_FORM_URL = "https://forms.gle/YOUR_FORM_ID_HERE";

  const validateField = (name: string, value: string) => {
    const errors: { [key: string]: string } = {};

    switch (name) {
      case "name":
        if (!value.trim()) errors.name = "Name is required";
        else if (value.trim().length < 2)
          errors.name = "Name must be at least 2 characters";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) errors.email = "Email is required";
        else if (!emailRegex.test(value))
          errors.email = "Please enter a valid email";
        break;
      case "phone":
        if (!value) errors.phone = "Phone number is required";
        else if (!/^[\+]?[0-9\s\-\(\)]{7,}$/.test(value)) {
          errors.phone = "Please enter a valid phone number";
        }
        break;
    }

    setFieldErrors((prev) => ({ ...prev, [name]: errors[name] || "" }));
    return !errors[name];
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // Check if all required fields are filled and valid
  const isFormValid = () => {
    const requiredFields = ["name", "email", "phone"];

    const hasAllRequiredFields = requiredFields.every((field) => {
      const value = formData[field as keyof typeof formData];
      return typeof value === "string" && value.trim() !== "";
    });

    const hasNoErrors = requiredFields.every((field) => !fieldErrors[field]);
    return hasAllRequiredFields && hasNoErrors && formData.consent;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const isValid =
      validateField("name", formData.name) &&
      validateField("email", formData.email) &&
      validateField("phone", formData.phone);

    if (!isValid || !formData.consent) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare data for Google Sheets
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        province: formData.province,
        city: formData.city,
        lotInterest: formData.lotInterest,
        consent: formData.consent,
        ipAddress: await getUserIP(),
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        website: window.location.origin,
      };

      console.log(
        "🚀 Attempting submission to Google Apps Script:",
        GOOGLE_SCRIPT_URL
      );
      console.log("📝 Submission data:", submissionData);


      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // Reduced timeout

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        // No Content-Type to keep it a "simple request" (no preflight)
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(submissionData),
        signal: controller.signal,
        mode: "cors",
      });

      clearTimeout(timeoutId);

      console.log("📊 Response status:", response.status);
      console.log(
        "📋 Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const raw = await response.text();
      let result: any;
      try {
        result = JSON.parse(raw);
      } catch {
        console.log("📄 Server raw response:", raw);
        throw new Error("Server did not return valid JSON");
      }
      console.log("✅ Parsed result:", result);

      if (result.success) {
        setSubmitStatus("success");
        toast.success("Your inquiry has been submitted successfully!");
        // Reset form on successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          country: "Philippines",
          province: "",
          city: "",
          lotInterest: "",
          consent: false,
        });
        // Clear any field errors
        setFieldErrors({});
      } else {
        throw new Error(result.message || "Server reported failure");
      }
    } catch (error) {
      console.error("❌ Form submission error:", error);

      // Provide specific error messages and fallback options
      if (
        error instanceof TypeError &&
        error.message.includes("Failed to fetch")
      ) {
        console.error("🌐 Network error - trying email fallback");
        toast.error(
          "Network error occurred. Opening email client as fallback."
        );
        handleEmailSubmission();
        return;
      } else if (error.name === "AbortError") {
        console.error("⏱️ Request timed out - trying email fallback");
        toast.error("Request timed out. Opening email client as fallback.");
        handleEmailSubmission();
        return;
      }

      console.error("🚨 Unexpected error:", error.message);
      toast.error(
        "An unexpected error occurred. Please try the alternative contact methods."
      );
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to get user's IP address (optional)
  const getUserIP = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json", {
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.log("⚠️ Could not fetch IP address:", error.message);
      return "Unknown";
    }
  };

  // Email fallback submission
  const handleEmailSubmission = () => {
    setSubmitStatus("fallback");

    // Create an email body with form data
    const emailBody = `
Hi Narra Cliffs Team,

I'm interested in scheduling a site visit for Narra Cliffs lots. Here are my details:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Location: ${formData.city ? `${formData.city}, ` : ""}${
      formData.province ? `${formData.province}, ` : ""
    }${formData.country}
${formData.lotInterest ? `Lot Interest: ${formData.lotInterest}` : ""}

Please contact me to schedule a site visit.

Best regards,
${formData.name}
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:info@narracliffs.com?subject=Site Visit Request - ${encodeURIComponent(
      formData.name
    )}&body=${encodeURIComponent(emailBody)}`;

    try {
      // Open email client
      window.open(mailtoLink, "_blank");
      console.log("📧 Email client opened with form data");
      toast.success("Email client opened with your inquiry details!");
    } catch (error) {
      console.error("❌ Failed to open email client:", error);
      toast.error(
        "Failed to open email client. Please contact us directly at info@narracliffs.com"
      );

      // Copy email content to clipboard as backup
      if (navigator.clipboard) {
        navigator.clipboard.writeText(
          `Email: info@narracliffs.com\nSubject: Site Visit Request - ${formData.name}\n\n${emailBody}`
        );
        toast.info("Contact details copied to clipboard!");
      }
    }
  };

  // Shared Button Component for "Contact Us"
  const DiscoverLotsButton = ({ className = "", ...props }) => (
    <div className={`${className}`}>
      <button
        className="bg-[#DA743F] text-white px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 rounded-lg shadow-lg text-sm md:text-base lg:text-lg font-medium tracking-wide transition-transform duration-200 hover:scale-105"
        onClick={() => {
          if (onNavigateToContact) {
            onNavigateToContact();
          }
        }}
        {...props}
      >
        <div className="flex items-center space-x-1 md:space-x-2 lg:space-x-3">
          <Phone className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
          <span className="font-medium tracking-wide">Contact Us</span>
        </div>
      </button>
    </div>
  );

  // Contact Us Button Component
  const ContactUsButton = ({ className = "", ...props }) => (
    <div className={`${className}`}>
      <button
        className="bg-[#DA743F] text-white px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 rounded-lg shadow-lg text-sm md:text-base lg:text-lg font-medium tracking-wide transition-transform duration-200 hover:scale-105"
        onClick={() => {
          if (onNavigateToContact) {
            onNavigateToContact();
          }
        }}
        {...props}
      >
        <div className="flex items-center space-x-1 md:space-x-2 lg:space-x-3">
          <Phone className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
          <span className="font-medium tracking-wide">Contact Us</span>
        </div>
      </button>
    </div>
  );

  return (
    <section
      id="contact"
      className="relative overflow-hidden !bg-transparent py-8 md:py-12 lg:py-16 2xl:py-20 4xl:py-24 min-h-[80vh] 2xl:min-h-[85vh] 4xl:min-h-[90vh]"
      style={{ background: "transparent" }}
    >
      {/* Mountain Landscape Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${mountainLandscape})`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            backgroundRepeat: "no-repeat",
            minHeight: "80vh",
            minWidth: "100vw",
          }}
        />
        {/* Brand Color Overlay with 60% Opacity */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundColor: "#4A573B",
            opacity: 0.6,
          }}
        />
      </div>

      <div className="relative z-10 h-full">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 4xl:px-24 h-full"
        >
          {/* Mobile and Tablet Layout */}
          <div className="lg:hidden space-y-6 md:space-y-8">
            {/* Form Header - Mobile */}
            <motion.h3
              className="font-garamond text-2xl sm:text-3xl md:text-4xl text-white text-center drop-shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                textShadow:
                  "2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)",
              }}
            >
              Your journey to
              <br />
              Narra Cliffs starts here
            </motion.h3>

            {/* Promotional Text - Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="text-center space-y-2 md:space-y-3"
            >
              <motion.p
                className="font-garamond text-base sm:text-lg md:text-xl text-white/90 drop-shadow-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{
                  textShadow:
                    "1px 1px 3px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 0, 0, 0.5)",
                }}
              >
                Book your personal site tour today
              </motion.p>

              {/* Discover Available Lots Button - Mobile */}
              <DiscoverLotsButton className="mt-6 md:mt-8" />
            </motion.div>

            {/* Form - Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="max-w-md mx-auto"
            >
              {/* Form Header */}
              <motion.h2
                className="font-garamond text-xl sm:text-2xl md:text-3xl text-white text-center drop-shadow-2xl mb-4 md:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{
                  textShadow:
                    "2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)",
                }}
              >
                Limited Lots, Unlimited Views
              </motion.h2>

              <Card
                className="border-0 !bg-transparent p-4 sm:p-6 relative overflow-hidden w-full"
                style={{
                  background: "transparent",
                  backgroundColor: "transparent",
                }}
              >
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6 relative z-10"
                >
                  {/* Status Messages */}
                  {submitStatus !== "idle" && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`mb-6 p-4 rounded-lg border ${
                        submitStatus === "success"
                          ? "bg-green-100 border-green-300 text-green-800"
                          : submitStatus === "fallback"
                          ? "bg-blue-500/10 border-blue-200 text-blue-800"
                          : "bg-orange-500/10 border-orange-200 text-orange-800"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {submitStatus === "success" ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : submitStatus === "fallback" ? (
                          <ExternalLink className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        )}
                        <div>
                          {submitStatus === "success" ? (
                            <div>
                              <div className="font-semibold">Success!</div>
                              <div>
                                Your inquiry has been submitted successfully.
                                We'll contact you within 24 hours.
                              </div>
                            </div>
                          ) : submitStatus === "fallback" ? (
                            <div>
                              <div className="font-semibold">
                                Email Client Opened
                              </div>
                              <div>
                                Please send the email that was prepared for you,
                                or contact us directly using the information
                                below.
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="font-semibold">
                                Submission Failed
                              </div>
                              <div>
                                There was an issue submitting your form. Please
                                try the alternative contact methods below.
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* All Form Fields - Single Column Layout */}
                  <div className="space-y-4">
                    {/* Full Name */}
                    <div className="relative">
                      <label className="block text-sm md:text-base font-medium text-white drop-shadow-lg mb-2 md:mb-3">
                        Full Name *
                      </label>
                      <div className="relative">
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="Your full name"
                          className={`h-12 md:h-14 text-sm md:text-base px-3 md:px-4 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 placeholder:text-gray-500 ${
                            fieldErrors.name
                              ? "border-red-300 focus:border-red-500"
                              : formData.name
                              ? "border-green-300 focus:border-green-500"
                              : "focus:border-green-400"
                          }`}
                        />
                        {fieldErrors.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-5 left-0 text-xs text-red-300 drop-shadow"
                          >
                            {fieldErrors.name}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="relative">
                      <label className="block text-sm md:text-base font-medium text-white drop-shadow-lg mb-2 md:mb-3">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="your.email@example.com"
                          className={`h-12 md:h-14 text-sm md:text-base px-3 md:px-4 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 placeholder:text-gray-500 ${
                            fieldErrors.email
                              ? "border-red-300 focus:border-red-500"
                              : formData.email
                              ? "border-green-300 focus:border-green-500"
                              : "focus:border-green-400"
                          }`}
                        />
                        {fieldErrors.email && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-5 left-0 text-xs text-red-300 drop-shadow"
                          >
                            {fieldErrors.email}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                      <label className="block text-sm md:text-base font-medium text-white drop-shadow-lg mb-2 md:mb-3">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="+63 9XX XXX XXXX"
                          className={`h-12 md:h-14 text-sm md:text-base px-3 md:px-4 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 placeholder:text-gray-500 ${
                            fieldErrors.phone
                              ? "border-red-300 focus:border-red-500"
                              : formData.phone
                              ? "border-green-300 focus:border-green-500"
                              : "focus:border-green-400"
                          }`}
                        />
                        {fieldErrors.phone && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-5 left-0 text-xs text-red-300 drop-shadow"
                          >
                            {fieldErrors.phone}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Lot of Interest */}
                    <div>
                      <label className="block text-sm md:text-base font-medium text-white drop-shadow-lg mb-2 md:mb-3">
                        Lot of Interest
                      </label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({ ...formData, lotInterest: value })
                        }
                      >
                        <SelectTrigger
                          className={`h-12 md:h-14 text-sm md:text-base px-3 md:px-4 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 ${
                            formData.lotInterest
                              ? "border-green-300"
                              : "hover:border-green-300"
                          }`}
                        >
                          <SelectValue
                            placeholder="Select a view type"
                            className="text-gray-500"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cliffside-view">
                            Cliffside View
                          </SelectItem>
                          <SelectItem value="fairway-view">
                            Fairway View
                          </SelectItem>
                          <SelectItem value="lake-view">Lake View</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-sm md:text-base font-medium text-white drop-shadow-lg mb-2 md:mb-3">
                        Country
                      </label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) =>
                          setFormData({ ...formData, country: value })
                        }
                      >
                        <SelectTrigger
                          className={`h-12 md:h-14 text-sm md:text-base px-3 md:px-4 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 ${
                            formData.country
                              ? "border-green-300"
                              : "hover:border-green-300"
                          }`}
                        >
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Philippines">
                            Philippines
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Province */}
                    <div>
                      <label className="block text-sm md:text-base font-medium text-white drop-shadow-lg mb-2 md:mb-3">
                        Province
                      </label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({ ...formData, province: value })
                        }
                      >
                        <SelectTrigger
                          className={`h-12 md:h-14 text-sm md:text-base px-3 md:px-4 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 ${
                            formData.province
                              ? "border-green-300"
                              : "hover:border-green-300"
                          }`}
                        >
                          <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {philippinesProvinces.map((province) => (
                            <SelectItem key={province} value={province}>
                              {province}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm md:text-base font-medium text-white drop-shadow-lg mb-2 md:mb-3">
                        City
                      </label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({ ...formData, city: value })
                        }
                      >
                        <SelectTrigger
                          className={`h-12 md:h-14 text-sm md:text-base px-3 md:px-4 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 ${
                            formData.city
                              ? "border-green-300"
                              : "hover:border-green-300"
                          }`}
                        >
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {philippinesCities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start space-x-3 pt-2">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, consent: !!checked })
                      }
                      className={`mt-1 transition-all duration-300 border-white/30 w-4 h-4 ${
                        formData.consent ? "bg-green-600 border-green-600" : ""
                      }`}
                    />
                    <label
                      htmlFor="consent"
                      className="text-sm md:text-base text-white/90 drop-shadow leading-6 cursor-pointer"
                    >
                      I agree to the privacy policy and consent to my
                      information being used to contact me about Narra Cliffs
                      lot availability and scheduling site visits.
                    </label>
                  </div>

                  {/* Submit Button and Contact Options */}
                  <div className="space-y-4">
                    {/* Validation Helper Text */}
                    {!isFormValid() && !isSubmitting && (
                      <div className="text-xs md:text-sm text-gray-800 bg-white p-3 rounded-lg border border-gray-200 shadow-lg">
                        Please fill in all required fields (*) and check the
                        consent box to submit.
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-center">
                      <Button
                        type="submit"
                        disabled={!isFormValid() || isSubmitting}
                        className={`w-full h-12 md:h-14 text-sm md:text-base transition-all duration-300 border-2 ${
                          isFormValid() && !isSubmitting
                            ? "bg-green-600 border-green-600 text-white hover:bg-green-700 hover:border-green-700 shadow-lg hover:shadow-xl"
                            : "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Submitting...</span>
                          </div>
                        ) : (
                          "Submit Inquiry"
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </Card>
            </motion.div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16 2xl:gap-20 4xl:gap-24 h-full items-center">
            {/* Left Column - Promotional Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12"
            >
              <motion.h3
                className="font-garamond text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 4xl:text-7xl text-white drop-shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  textShadow:
                    "2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)",
                }}
              >
                Your journey to
                <br />
                Narra Cliffs starts here
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                className="space-y-4 lg:space-y-6"
              >
                <motion.p
                  className="font-garamond text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-white/90 drop-shadow-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  style={{
                    textShadow:
                      "1px 1px 3px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  Book your personal site tour today
                </motion.p>

                {/* Discover Available Lots Button - Desktop */}
                <DiscoverLotsButton className="mt-6 lg:mt-8" />
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="max-w-lg xl:max-w-xl 2xl:max-w-2xl 4xl:max-w-3xl mx-auto lg:mx-0"
            >
              {/* Form Header */}
              <motion.h2
                className="font-garamond text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 4xl:text-6xl text-white text-center drop-shadow-2xl mb-6 lg:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{
                  textShadow:
                    "2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)",
                }}
              >
                Limited Lots, Unlimited Views
              </motion.h2>

              <Card
                className="border-0 !bg-transparent p-6 lg:p-8 xl:p-10 2xl:p-12 4xl:p-16 relative overflow-hidden w-full"
                style={{
                  background: "transparent",
                  backgroundColor: "transparent",
                }}
              >
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 lg:space-y-8 xl:space-y-10 relative z-10"
                >
                  {/* Status Messages */}
                  {submitStatus !== "idle" && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`mb-6 p-4 rounded-lg border ${
                        submitStatus === "success"
                          ? "bg-green-100 border-green-300 text-green-800"
                          : submitStatus === "fallback"
                          ? "bg-blue-500/10 border-blue-200 text-blue-800"
                          : "bg-orange-500/10 border-orange-200 text-orange-800"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {submitStatus === "success" ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : submitStatus === "fallback" ? (
                          <ExternalLink className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        )}
                        <div>
                          {submitStatus === "success" ? (
                            <div>
                              <div className="font-semibold">Success!</div>
                              <div>
                                Your inquiry has been submitted successfully.
                                We'll contact you within 24 hours.
                              </div>
                            </div>
                          ) : submitStatus === "fallback" ? (
                            <div>
                              <div className="font-semibold">
                                Email Client Opened
                              </div>
                              <div>
                                Please send the email that was prepared for you,
                                or contact us directly using the information
                                below.
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="font-semibold">
                                Submission Failed
                              </div>
                              <div>
                                There was an issue submitting your form. Please
                                try the alternative contact methods below.
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* All Form Fields - Single Column Layout for Desktop too */}
                  <div className="space-y-4">
                    {/* Full Name */}
                    <div className="relative">
                      <label className="block text-sm md:text-base lg:text-lg xl:text-xl font-medium text-white drop-shadow-lg mb-2 md:mb-3">
                        Full Name *
                      </label>
                      <div className="relative">
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="Your full name"
                          className={`h-12 md:h-14 lg:h-16 xl:h-18 2xl:h-20 text-sm md:text-base lg:text-lg xl:text-xl px-3 md:px-4 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 placeholder:text-gray-500 ${
                            fieldErrors.name
                              ? "border-red-300 focus:border-red-500"
                              : formData.name
                              ? "border-green-300 focus:border-green-500"
                              : "focus:border-green-400"
                          }`}
                        />
                        {fieldErrors.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-5 left-0 text-xs text-red-300 drop-shadow"
                          >
                            {fieldErrors.name}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="relative">
                      <label className="block text-sm md:text-base lg:text-lg xl:text-xl font-medium text-white drop-shadow-lg mb-2 md:mb-3">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="your.email@example.com"
                          className={`h-12 md:h-14 lg:h-16 xl:h-18 2xl:h-20 text-sm md:text-base lg:text-lg xl:text-xl px-3 md:px-4 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 placeholder:text-gray-500 ${
                            fieldErrors.email
                              ? "border-red-300 focus:border-red-500"
                              : formData.email
                              ? "border-green-300 focus:border-green-500"
                              : "focus:border-green-400"
                          }`}
                        />
                        {fieldErrors.email && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-5 left-0 text-xs text-red-300 drop-shadow"
                          >
                            {fieldErrors.email}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                      <label className="block text-sm md:text-base lg:text-lg xl:text-xl font-medium text-white drop-shadow-lg mb-2 md:mb-3">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="+63 9XX XXX XXXX"
                          className={`h-12 md:h-14 lg:h-16 xl:h-18 2xl:h-20 text-sm md:text-base lg:text-lg xl:text-xl px-3 md:px-4 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 placeholder:text-gray-500 ${
                            fieldErrors.phone
                              ? "border-red-300 focus:border-red-500"
                              : formData.phone
                              ? "border-green-300 focus:border-green-500"
                              : "focus:border-green-400"
                          }`}
                        />
                        {fieldErrors.phone && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-5 left-0 text-xs text-red-300 drop-shadow"
                          >
                            {fieldErrors.phone}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Lot of Interest */}
                    <div>
                      <label className="block text-sm md:text-base lg:text-lg xl:text-xl font-medium text-white drop-shadow-lg mb-2 md:mb-3">
                        Lot of Interest
                      </label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({ ...formData, lotInterest: value })
                        }
                      >
                        <SelectTrigger
                          className={`h-12 md:h-14 lg:h-16 xl:h-18 2xl:h-20 text-sm md:text-base lg:text-lg xl:text-xl px-3 md:px-4 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 ${
                            formData.lotInterest
                              ? "border-green-300"
                              : "hover:border-green-300"
                          }`}
                        >
                          <SelectValue
                            placeholder="Select a view type"
                            className="text-gray-500"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cliffside-view">
                            Cliffside View
                          </SelectItem>
                          <SelectItem value="fairway-view">
                            Fairway View
                          </SelectItem>
                          <SelectItem value="lake-view">Lake View</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-sm md:text-base lg:text-lg xl:text-xl font-medium text-white drop-shadow-lg mb-2 md:mb-3">
                        Country
                      </label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) =>
                          setFormData({ ...formData, country: value })
                        }
                      >
                        <SelectTrigger
                          className={`h-12 md:h-14 lg:h-16 xl:h-18 2xl:h-20 text-sm md:text-base lg:text-lg xl:text-xl px-3 md:px-4 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 ${
                            formData.country
                              ? "border-green-300"
                              : "hover:border-green-300"
                          }`}
                        >
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Philippines">
                            Philippines
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Province */}
                    <div>
                      <label className="block text-sm md:text-base lg:text-lg xl:text-xl font-medium text-white drop-shadow-lg mb-2 md:mb-3">
                        Province
                      </label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({ ...formData, province: value })
                        }
                      >
                        <SelectTrigger
                          className={`h-12 md:h-14 lg:h-16 xl:h-18 2xl:h-20 text-sm md:text-base lg:text-lg xl:text-xl px-3 md:px-4 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 ${
                            formData.province
                              ? "border-green-300"
                              : "hover:border-green-300"
                          }`}
                        >
                          <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {philippinesProvinces.map((province) => (
                            <SelectItem key={province} value={province}>
                              {province}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm md:text-base lg:text-lg xl:text-xl font-medium text-white drop-shadow-lg mb-2 md:mb-3">
                        City
                      </label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({ ...formData, city: value })
                        }
                      >
                        <SelectTrigger
                          className={`h-12 md:h-14 lg:h-16 xl:h-18 2xl:h-20 text-sm md:text-base lg:text-lg xl:text-xl px-3 md:px-4 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 ${
                            formData.city
                              ? "border-green-300"
                              : "hover:border-green-300"
                          }`}
                        >
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {philippinesCities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start space-x-3 pt-2">
                    <Checkbox
                      id="consent-desktop"
                      checked={formData.consent}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, consent: !!checked })
                      }
                      className={`mt-1 transition-all duration-300 border-white/30 w-4 h-4 lg:w-5 lg:h-5 ${
                        formData.consent ? "bg-green-600 border-green-600" : ""
                      }`}
                    />
                    <label
                      htmlFor="consent-desktop"
                      className="text-sm md:text-base lg:text-lg xl:text-xl text-white/90 drop-shadow leading-6 cursor-pointer"
                    >
                      I agree to the privacy policy and consent to my
                      information being used to contact me about Narra Cliffs
                      lot availability and scheduling site visits.
                    </label>
                  </div>

                  {/* Submit Button and Contact Options */}
                  <div className="space-y-4">
                    {/* Validation Helper Text */}
                    {!isFormValid() && !isSubmitting && (
                      <div className="text-sm md:text-base lg:text-lg text-gray-800 bg-white p-3 lg:p-4 xl:p-6 rounded-lg border border-gray-200 shadow-lg">
                        Please fill in all required fields (*) and check the
                        consent box to submit.
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-center">
                      <Button
                        type="submit"
                        disabled={!isFormValid() || isSubmitting}
                        className={`w-full h-12 md:h-14 lg:h-16 xl:h-18 2xl:h-20 text-sm md:text-base lg:text-lg xl:text-xl transition-all duration-300 border-2 ${
                          isFormValid() && !isSubmitting
                            ? "bg-green-600 border-green-600 text-white hover:bg-green-700 hover:border-green-700 shadow-lg hover:shadow-xl"
                            : "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Submitting...</span>
                          </div>
                        ) : (
                          "Submit Inquiry"
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
