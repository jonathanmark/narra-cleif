import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Card } from '../ui/card';
import { AlertCircle, CheckCircle, ExternalLink, MapPin, ChevronRight, Phone, Mail } from 'lucide-react';
import { philippinesProvinces, philippinesCities } from '../constants/location-data';
import { toast } from "sonner@2.0.3";
import mountainLandscape from 'figma:asset/849a218492e16cbee4645dc827d3dc4e86118c11.png';

interface ContactSectionProps {
  onNavigateToLots?: () => void;
}

export function ContactSection({ onNavigateToLots }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'Philippines',
    province: '',
    city: '',
    lotInterest: '',
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'fallback'>('idle');
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  
  // Google Apps Script Web App URL (Production)
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx0ZJ3GKra8C5bn3fWAXBZ0Gvj3fjHZ4LsXFBlXC1oF3-iOcD3szNHP6UppFTrqdpoX/exec';
  
  // Google Form URL as a backup (you can create this easily)
  const GOOGLE_FORM_URL = 'https://forms.gle/YOUR_FORM_ID_HERE';

  const validateField = (name: string, value: string) => {
    const errors: {[key: string]: string} = {};
    
    switch (name) {
      case 'name':
        if (!value.trim()) errors.name = 'Name is required';
        else if (value.trim().length < 2) errors.name = 'Name must be at least 2 characters';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) errors.email = 'Email is required';
        else if (!emailRegex.test(value)) errors.email = 'Please enter a valid email';
        break;
      case 'phone':
        if (!value) errors.phone = 'Phone number is required';
        else if (!/^[\+]?[0-9\s\-\(\)]{7,}$/.test(value)) {
          errors.phone = 'Please enter a valid phone number';
        }
        break;
    }
    
    setFieldErrors(prev => ({ ...prev, [name]: errors[name] || '' }));
    return !errors[name];
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // Check if all required fields are filled and valid
  const isFormValid = () => {
    const requiredFields = ['name', 'email', 'phone'];
    
    const hasAllRequiredFields = requiredFields.every(field => {
      const value = formData[field as keyof typeof formData];
      return typeof value === 'string' && value.trim() !== '';
    });
    
    const hasNoErrors = requiredFields.every(field => !fieldErrors[field]);
    return hasAllRequiredFields && hasNoErrors && formData.consent;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const isValid = validateField('name', formData.name) && 
                   validateField('email', formData.email) && 
                   validateField('phone', formData.phone);

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
        website: window.location.origin
      };

      console.log('🚀 Attempting submission to Google Apps Script:', GOOGLE_SCRIPT_URL);
      console.log('📝 Submission data:', submissionData);

      // Check if we're in development environment
      const isDevelopment = window.location.hostname === 'localhost' || 
                           window.location.hostname.includes('figma') ||
                           window.location.hostname.includes('preview');

      if (isDevelopment) {
        // Development mode - simulate successful submission
        console.log('🔧 Development mode detected - simulating successful form submission');
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        
        setSubmitStatus('success');
        toast.success('Form submitted successfully! (Development Mode)');
        console.log('✅ Form submission simulated successfully in development mode');
        
        // Reset form on successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          country: 'Philippines',
          province: '',
          city: '',
          lotInterest: '',
          consent: false
        });
        // Clear any field errors
        setFieldErrors({});
        return;
      }

      // Production mode - attempt real submission
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // Reduced timeout

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(submissionData),
        signal: controller.signal,
        mode: 'cors'
      });

      clearTimeout(timeoutId);

      console.log('📊 Response status:', response.status);
      console.log('📋 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.log('📄 Non-JSON response:', textResponse);
        throw new Error('Invalid response format from server');
      }

      const result = await response.json();
      console.log('✅ Parsed result:', result);
      
      if (result.success) {
        setSubmitStatus('success');
        toast.success('Your inquiry has been submitted successfully!');
        // Reset form on successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          country: 'Philippines',
          province: '',
          city: '',
          lotInterest: '',
          consent: false
        });
        // Clear any field errors
        setFieldErrors({});
      } else {
        throw new Error(result.message || 'Server reported failure');
      }
    } catch (error) {
      console.error('❌ Form submission error:', error);
      
      // Provide specific error messages and fallback options
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error('🌐 Network error - trying email fallback');
        toast.error('Network error occurred. Opening email client as fallback.');
        handleEmailSubmission();
        return;
      } else if (error.name === 'AbortError') {
        console.error('⏱️ Request timed out - trying email fallback');
        toast.error('Request timed out. Opening email client as fallback.');
        handleEmailSubmission();
        return;
      }
      
      console.error('🚨 Unexpected error:', error.message);
      toast.error('An unexpected error occurred. Please try the alternative contact methods.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to get user's IP address (optional)
  const getUserIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json', {
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.log('⚠️ Could not fetch IP address:', error.message);
      return 'Unknown';
    }
  };

  // Email fallback submission
  const handleEmailSubmission = () => {
    setSubmitStatus('fallback');
    
    // Create an email body with form data
    const emailBody = `
Hi Narra Cliffs Team,

I'm interested in scheduling a site visit for Narra Cliffs lots. Here are my details:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Location: ${formData.city ? `${formData.city}, ` : ''}${formData.province ? `${formData.province}, ` : ''}${formData.country}
${formData.lotInterest ? `Lot Interest: ${formData.lotInterest}` : ''}

Please contact me to schedule a site visit.

Best regards,
${formData.name}
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:info@narracliffs.com?subject=Site Visit Request - ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(emailBody)}`;
    
    try {
      // Open email client
      window.open(mailtoLink, '_blank');
      console.log('📧 Email client opened with form data');
      toast.success('Email client opened with your inquiry details!');
    } catch (error) {
      console.error('❌ Failed to open email client:', error);
      toast.error('Failed to open email client. Please contact us directly at info@narracliffs.com');
      
      // Copy email content to clipboard as backup
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`Email: info@narracliffs.com\\nSubject: Site Visit Request - ${formData.name}\\n\\n${emailBody}`);
        toast.info('Contact details copied to clipboard!');
      }
    }
  };

  // Contact Us Information Component
  const ContactUsInfo = ({ className = "", ...props }) => (
    <div className={`${className} hidden md:block`}>
      <div className="space-y-4 max-w-sm mx-auto">
        {/* Email */}
        <motion.div 
          className="grid grid-cols-[auto_1fr] gap-3 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-[#DA743F] p-3 rounded-lg shadow-lg flex-shrink-0">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <a 
            href="mailto:greendotresidences@gmail.com"
            className="font-rotunda text-sm text-white font-medium hover:text-[#DA743F] transition-colors duration-200 text-left"
            style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'
            }}
          >
            greendotresidences@gmail.com
          </a>
        </motion.div>

        {/* Phone */}
        <motion.div 
          className="grid grid-cols-[auto_1fr] gap-3 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="bg-[#DA743F] p-3 rounded-lg shadow-lg flex-shrink-0">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <a 
            href="tel:09177031475"
            className="font-rotunda text-sm text-white font-medium hover:text-[#DA743F] transition-colors duration-200 text-left"
            style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'
            }}
          >
            09177031475
          </a>
        </motion.div>

        {/* Address */}
        <motion.div 
          className="grid grid-cols-[auto_1fr] gap-3 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="bg-[#DA743F] p-3 rounded-lg shadow-lg flex-shrink-0">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <p 
            className="font-rotunda text-sm text-white font-medium leading-relaxed text-left"
            style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'
            }}
          >
            Narra Cliff, Eastridge, Binangonan, Rizal
          </p>
        </motion.div>
      </div>
    </div>
  );

  return (
    <section id="contact" className="relative overflow-hidden !bg-transparent py-8 md:py-12 lg:py-16 2xl:py-20 4xl:py-24 min-h-[80vh] 2xl:min-h-[85vh] 4xl:min-h-[90vh]" style={{background: 'transparent'}}>
      {/* Mountain Landscape Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${mountainLandscape})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
            minHeight: '80vh',
            minWidth: '100vw'
          }}
        />
        {/* Brand Color Overlay with 60% Opacity */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundColor: '#4A573B',
            opacity: 0.6
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
            {/* Form Header - Mobile - Bigger Text */}
            <motion.h3 
              className="font-garamond text-3xl sm:text-4xl md:text-5xl text-white text-center drop-shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)'
              }}
            >
              Your journey to<br />
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
                className="font-garamond text-xl sm:text-2xl md:text-3xl text-white/90 drop-shadow-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{
                  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 0, 0, 0.5)'
                }}
              >
                Book your personal site tour today
              </motion.p>

              {/* Contact Information - Mobile Only - No Box */}
              <motion.div
                className="block lg:hidden mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div className="space-y-4 max-w-sm mx-auto">
                  {/* Email */}
                  <motion.div 
                    className="grid grid-cols-[auto_1fr] gap-3 items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <div className="bg-[#DA743F] p-3 rounded-lg shadow-lg flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <a 
                      href="mailto:greendotresidences@gmail.com"
                      className="font-rotunda text-sm text-white font-medium hover:text-[#DA743F] transition-colors duration-200 text-left"
                      style={{
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'
                      }}
                    >
                      greendotresidences@gmail.com
                    </a>
                  </motion.div>

                  {/* Phone */}
                  <motion.div 
                    className="grid grid-cols-[auto_1fr] gap-3 items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <div className="bg-[#DA743F] p-3 rounded-lg shadow-lg flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <a 
                      href="tel:09177031475"
                      className="font-rotunda text-sm text-white font-medium hover:text-[#DA743F] transition-colors duration-200 text-left"
                      style={{
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'
                      }}
                    >
                      09177031475
                    </a>
                  </motion.div>

                  {/* Address */}
                  <motion.div 
                    className="grid grid-cols-[auto_1fr] gap-3 items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <div className="bg-[#DA743F] p-3 rounded-lg shadow-lg flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <p 
                      className="font-rotunda text-sm text-white font-medium leading-relaxed text-left"
                      style={{
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'
                      }}
                    >
                      Narra Cliff, Eastridge, Binangonan, Rizal
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Contact Information - Desktop */}
              <ContactUsInfo className="mt-6 md:mt-8" />
            </motion.div>

            {/* Form - Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="max-w-md mx-auto"
            >
              {/* Form Header - Bigger Text with Extra Spacing */}
              <motion.h2 
                className="font-garamond text-2xl sm:text-3xl md:text-4xl text-white text-center drop-shadow-2xl mb-6 md:mb-8 mt-8 md:mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)'
                }}
              >
                Limited Lots, Unlimited Views
              </motion.h2>
              
              <Card className="border-0 !bg-transparent p-4 sm:p-6 relative overflow-hidden w-full" style={{background: 'transparent', backgroundColor: 'transparent'}}>
                <form 
                  onSubmit={handleSubmit} 
                  className="space-y-4 md:space-y-6 relative z-10"
                >
                  {/* Status Messages */}
                  {submitStatus !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`mb-6 p-4 rounded-lg border ${
                        submitStatus === 'success' 
                          ? 'bg-green-100 border-green-300 text-green-800' 
                          : submitStatus === 'fallback'
                          ? 'bg-blue-500/10 border-blue-200 text-blue-800'
                          : 'bg-orange-500/10 border-orange-200 text-orange-800'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {submitStatus === 'success' ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : submitStatus === 'fallback' ? (
                          <ExternalLink className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        )}
                        <div>
                          {submitStatus === 'success' ? (
                            <div>
                              <div className="font-semibold">Success!</div>
                              <div>Your inquiry has been submitted successfully. We'll contact you within 24 hours.</div>
                            </div>
                          ) : submitStatus === 'fallback' ? (
                            <div>
                              <div className="font-semibold">Email Client Opened</div>
                              <div>Please send the email that was prepared for you, or contact us directly using the information below.</div>
                            </div>
                          ) : (
                            <div>
                              <div className="font-semibold">Submission Failed</div>
                              <div>There was an issue submitting your form. Please try the alternative contact methods below.</div>
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
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your full name"
                          className={`h-12 md:h-14 text-sm md:text-base px-3 md:px-4 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 placeholder:text-gray-500 ${
                            fieldErrors.name 
                              ? 'border-red-300 focus:border-red-500' 
                              : formData.name 
                              ? 'border-green-300 focus:border-green-500' 
                              : 'focus:border-green-400'
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
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your.email@example.com"
                          className={`h-12 md:h-14 text-sm md:text-base px-3 md:px-4 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 placeholder:text-gray-500 ${
                            fieldErrors.email 
                              ? 'border-red-300 focus:border-red-500' 
                              : formData.email 
                              ? 'border-green-300 focus:border-green-500' 
                              : 'focus:border-green-400'
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
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+63 9XX XXX XXXX"
                          className={`h-12 md:h-14 text-sm md:text-base px-3 md:px-4 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 placeholder:text-gray-500 ${
                            fieldErrors.phone 
                              ? 'border-red-300 focus:border-red-500' 
                              : formData.phone 
                              ? 'border-green-300 focus:border-green-500' 
                              : 'focus:border-green-400'
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
                      <Select onValueChange={(value) => setFormData({...formData, lotInterest: value})}>
                        <SelectTrigger className={`h-12 md:h-14 text-sm md:text-base px-3 md:px-4 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 ${
                          formData.lotInterest ? 'border-green-300' : 'hover:border-green-300'
                        }`}>
                          <SelectValue placeholder="Select a view type" className="text-gray-500" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cliffside-view">Cliffside View</SelectItem>
                          <SelectItem value="fairway-view">Fairway View</SelectItem>
                          <SelectItem value="lake-view">Lake View</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-sm md:text-base font-medium text-white drop-shadow-lg mb-2 md:mb-3">
                        Country
                      </label>
                      <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
                        <SelectTrigger className={`h-12 md:h-14 text-sm md:text-base px-3 md:px-4 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 ${
                          formData.country ? 'border-green-300' : 'hover:border-green-300'
                        }`}>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Philippines">Philippines</SelectItem>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                          <SelectItem value="Singapore">Singapore</SelectItem>
                          <SelectItem value="Japan">Japan</SelectItem>
                          <SelectItem value="South Korea">South Korea</SelectItem>
                          <SelectItem value="Hong Kong">Hong Kong</SelectItem>
                          <SelectItem value="UAE">UAE</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Province (for Philippines only) */}
                    {formData.country === 'Philippines' && (
                      <div>
                        <label className="block text-sm md:text-base font-medium text-white drop-shadow-lg mb-2 md:mb-3">
                          Province/Region
                        </label>
                        <Select onValueChange={(value) => setFormData({...formData, province: value, city: ''})}>
                          <SelectTrigger className={`h-12 md:h-14 text-sm md:text-base px-3 md:px-4 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 ${
                            formData.province ? 'border-green-300' : 'hover:border-green-300'
                          }`}>
                            <SelectValue placeholder="Select province" />
                          </SelectTrigger>
                          <SelectContent>
                            {philippinesProvinces.map((province) => (
                              <SelectItem key={province} value={province}>
                                {province}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* City (for Philippines only, filtered by province) */}
                    {formData.country === 'Philippines' && formData.province && (
                      <div>
                        <label className="block text-sm md:text-base font-medium text-white drop-shadow-lg mb-2 md:mb-3">
                          City/Municipality
                        </label>
                        <Select onValueChange={(value) => setFormData({...formData, city: value})}>
                          <SelectTrigger className={`h-12 md:h-14 text-sm md:text-base px-3 md:px-4 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 ${
                            formData.city ? 'border-green-300' : 'hover:border-green-300'
                          }`}>
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            {philippinesCities[formData.province]?.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            )) || <SelectItem value="Other">Other</SelectItem>}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => setFormData({...formData, consent: !!checked})}
                        className="border-white/30 data-[state=checked]:bg-[#DA743F] data-[state=checked]:border-[#DA743F] mt-1"
                      />
                      <label
                        htmlFor="consent"
                        className="text-xs md:text-sm text-white/90 font-light leading-relaxed cursor-pointer"
                        style={{
                          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'
                        }}
                      >
                        I consent to being contacted by Narra Cliffs regarding my inquiry. I understand that my personal information will be used solely for the purpose of responding to my request and will not be shared with third parties.
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={!isFormValid() || isSubmitting}
                      className={`w-full h-12 md:h-14 text-sm md:text-base px-6 md:px-8 font-medium tracking-wide transition-all duration-300 ${
                        !isFormValid() || isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed opacity-50'
                          : 'bg-[#DA743F] hover:bg-[#DA743F]/90 hover:scale-105 transform'
                      } text-white rounded-lg shadow-lg`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>Submit Inquiry</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          </div>

          {/* Desktop Layout - Two Column */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 xl:gap-16 2xl:gap-20 4xl:gap-24 items-center">
            {/* Left Column - Form Header and Contact Info */}
            <div className="space-y-8 xl:space-y-10 2xl:space-y-12">
              {/* Form Header - Desktop - Bigger Text */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6 xl:space-y-8 2xl:space-y-10"
              >
                <motion.h1 
                  className="font-garamond text-4xl xl:text-5xl 2xl:text-6xl 4xl:text-7xl text-white drop-shadow-2xl leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  style={{
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)'
                  }}
                >
                  Your journey to<br />
                  Narra Cliffs starts here
                </motion.h1>

                <motion.p 
                  className="font-garamond text-xl xl:text-2xl 2xl:text-3xl 4xl:text-4xl text-white/90 drop-shadow-xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{
                    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  Book your personal site tour today
                </motion.p>
              </motion.div>

              {/* Contact Information - Desktop */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-6 xl:space-y-8 2xl:space-y-10"
              >
                <div className="space-y-6">
                  {/* Email */}
                  <motion.div 
                    className="grid grid-cols-[auto_1fr] gap-4 xl:gap-5 2xl:gap-6 items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <div className="bg-[#DA743F] p-4 xl:p-5 2xl:p-6 rounded-lg shadow-lg flex-shrink-0">
                      <Mail className="w-6 h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-white" />
                    </div>
                    <a 
                      href="mailto:greendotresidences@gmail.com"
                      className="font-rotunda text-lg xl:text-xl 2xl:text-2xl text-white font-medium hover:text-[#DA743F] transition-colors duration-200 text-left"
                      style={{
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'
                      }}
                    >
                      greendotresidences@gmail.com
                    </a>
                  </motion.div>

                  {/* Phone */}
                  <motion.div 
                    className="grid grid-cols-[auto_1fr] gap-4 xl:gap-5 2xl:gap-6 items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <div className="bg-[#DA743F] p-4 xl:p-5 2xl:p-6 rounded-lg shadow-lg flex-shrink-0">
                      <Phone className="w-6 h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-white" />
                    </div>
                    <a 
                      href="tel:09177031475"
                      className="font-rotunda text-lg xl:text-xl 2xl:text-2xl text-white font-medium hover:text-[#DA743F] transition-colors duration-200 text-left"
                      style={{
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'
                      }}
                    >
                      09177031475
                    </a>
                  </motion.div>

                  {/* Address */}
                  <motion.div 
                    className="grid grid-cols-[auto_1fr] gap-4 xl:gap-5 2xl:gap-6 items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <div className="bg-[#DA743F] p-4 xl:p-5 2xl:p-6 rounded-lg shadow-lg flex-shrink-0">
                      <MapPin className="w-6 h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-white" />
                    </div>
                    <p 
                      className="font-rotunda text-lg xl:text-xl 2xl:text-2xl text-white font-medium leading-relaxed text-left"
                      style={{
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'
                      }}
                    >
                      Narra Cliff, Eastridge, Binangonan, Rizal
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="max-w-lg xl:max-w-xl 2xl:max-w-2xl"
            >
              {/* Form Header - Desktop */}
              <motion.h2 
                className="font-garamond text-3xl xl:text-4xl 2xl:text-5xl 4xl:text-6xl text-white text-center drop-shadow-2xl mb-8 xl:mb-10 2xl:mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)'
                }}
              >
                Limited Lots, Unlimited Views
              </motion.h2>
              
              <Card className="border-0 !bg-transparent p-6 xl:p-8 2xl:p-10 relative overflow-hidden w-full" style={{background: 'transparent', backgroundColor: 'transparent'}}>
                <form 
                  onSubmit={handleSubmit} 
                  className="space-y-6 xl:space-y-8 relative z-10"
                >
                  {/* Status Messages */}
                  {submitStatus !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`mb-6 p-4 rounded-lg border ${
                        submitStatus === 'success' 
                          ? 'bg-green-100 border-green-300 text-green-800' 
                          : submitStatus === 'fallback'
                          ? 'bg-blue-500/10 border-blue-200 text-blue-800'
                          : 'bg-orange-500/10 border-orange-200 text-orange-800'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {submitStatus === 'success' ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : submitStatus === 'fallback' ? (
                          <ExternalLink className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        )}
                        <div>
                          {submitStatus === 'success' ? (
                            <div>
                              <div className="font-semibold">Success!</div>
                              <div>Your inquiry has been submitted successfully. We'll contact you within 24 hours.</div>
                            </div>
                          ) : submitStatus === 'fallback' ? (
                            <div>
                              <div className="font-semibold">Email Client Opened</div>
                              <div>Please send the email that was prepared for you, or contact us directly using the information below.</div>
                            </div>
                          ) : (
                            <div>
                              <div className="font-semibold">Submission Failed</div>
                              <div>There was an issue submitting your form. Please try the alternative contact methods below.</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* All Form Fields - Single Column Layout */}
                  <div className="space-y-5 xl:space-y-6">
                    {/* Full Name */}
                    <div className="relative">
                      <label className="block text-base xl:text-lg 2xl:text-xl font-medium text-white drop-shadow-lg mb-3 xl:mb-4">
                        Full Name *
                      </label>
                      <div className="relative">
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your full name"
                          className={`h-14 xl:h-16 2xl:h-18 text-base xl:text-lg px-4 xl:px-5 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 placeholder:text-gray-500 ${
                            fieldErrors.name 
                              ? 'border-red-300 focus:border-red-500' 
                              : formData.name 
                              ? 'border-green-300 focus:border-green-500' 
                              : 'focus:border-green-400'
                          }`}
                        />
                        {fieldErrors.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-5 left-0 text-sm text-red-300 drop-shadow"
                          >
                            {fieldErrors.name}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="relative">
                      <label className="block text-base xl:text-lg 2xl:text-xl font-medium text-white drop-shadow-lg mb-3 xl:mb-4">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your.email@example.com"
                          className={`h-14 xl:h-16 2xl:h-18 text-base xl:text-lg px-4 xl:px-5 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 placeholder:text-gray-500 ${
                            fieldErrors.email 
                              ? 'border-red-300 focus:border-red-500' 
                              : formData.email 
                              ? 'border-green-300 focus:border-green-500' 
                              : 'focus:border-green-400'
                          }`}
                        />
                        {fieldErrors.email && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-5 left-0 text-sm text-red-300 drop-shadow"
                          >
                            {fieldErrors.email}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                      <label className="block text-base xl:text-lg 2xl:text-xl font-medium text-white drop-shadow-lg mb-3 xl:mb-4">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+63 9XX XXX XXXX"
                          className={`h-14 xl:h-16 2xl:h-18 text-base xl:text-lg px-4 xl:px-5 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 placeholder:text-gray-500 ${
                            fieldErrors.phone 
                              ? 'border-red-300 focus:border-red-500' 
                              : formData.phone 
                              ? 'border-green-300 focus:border-green-500' 
                              : 'focus:border-green-400'
                          }`}
                        />
                        {fieldErrors.phone && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-5 left-0 text-sm text-red-300 drop-shadow"
                          >
                            {fieldErrors.phone}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Lot of Interest */}
                    <div>
                      <label className="block text-base xl:text-lg 2xl:text-xl font-medium text-white drop-shadow-lg mb-3 xl:mb-4">
                        Lot of Interest
                      </label>
                      <Select onValueChange={(value) => setFormData({...formData, lotInterest: value})}>
                        <SelectTrigger className={`h-14 xl:h-16 2xl:h-18 text-base xl:text-lg px-4 xl:px-5 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 ${
                          formData.lotInterest ? 'border-green-300' : 'hover:border-green-300'
                        }`}>
                          <SelectValue placeholder="Select a view type" className="text-gray-500" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cliffside-view">Cliffside View</SelectItem>
                          <SelectItem value="fairway-view">Fairway View</SelectItem>
                          <SelectItem value="lake-view">Lake View</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-base xl:text-lg 2xl:text-xl font-medium text-white drop-shadow-lg mb-3 xl:mb-4">
                        Country
                      </label>
                      <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
                        <SelectTrigger className={`h-14 xl:h-16 2xl:h-18 text-base xl:text-lg px-4 xl:px-5 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 ${
                          formData.country ? 'border-green-300' : 'hover:border-green-300'
                        }`}>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Philippines">Philippines</SelectItem>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                          <SelectItem value="Singapore">Singapore</SelectItem>
                          <SelectItem value="Japan">Japan</SelectItem>
                          <SelectItem value="South Korea">South Korea</SelectItem>
                          <SelectItem value="Hong Kong">Hong Kong</SelectItem>
                          <SelectItem value="UAE">UAE</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Province (for Philippines only) */}
                    {formData.country === 'Philippines' && (
                      <div>
                        <label className="block text-base xl:text-lg 2xl:text-xl font-medium text-white drop-shadow-lg mb-3 xl:mb-4">
                          Province/Region
                        </label>
                        <Select onValueChange={(value) => setFormData({...formData, province: value, city: ''})}>
                          <SelectTrigger className={`h-14 xl:h-16 2xl:h-18 text-base xl:text-lg px-4 xl:px-5 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 ${
                            formData.province ? 'border-green-300' : 'hover:border-green-300'
                          }`}>
                            <SelectValue placeholder="Select province" />
                          </SelectTrigger>
                          <SelectContent>
                            {philippinesProvinces.map((province) => (
                              <SelectItem key={province} value={province}>
                                {province}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* City (for Philippines only, filtered by province) */}
                    {formData.country === 'Philippines' && formData.province && (
                      <div>
                        <label className="block text-base xl:text-lg 2xl:text-xl font-medium text-white drop-shadow-lg mb-3 xl:mb-4">
                          City/Municipality
                        </label>
                        <Select onValueChange={(value) => setFormData({...formData, city: value})}>
                          <SelectTrigger className={`h-14 xl:h-16 2xl:h-18 text-base xl:text-lg px-4 xl:px-5 transition-all duration-300 bg-green-50/90 border-white/30 text-gray-800 ${
                            formData.city ? 'border-green-300' : 'hover:border-green-300'
                          }`}>
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            {philippinesCities[formData.province]?.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            )) || <SelectItem value="Other">Other</SelectItem>}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => setFormData({...formData, consent: !!checked})}
                        className="border-white/30 data-[state=checked]:bg-[#DA743F] data-[state=checked]:border-[#DA743F] mt-1"
                      />
                      <label
                        htmlFor="consent"
                        className="text-sm xl:text-base text-white/90 font-light leading-relaxed cursor-pointer"
                        style={{
                          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'
                        }}
                      >
                        I consent to being contacted by Narra Cliffs regarding my inquiry. I understand that my personal information will be used solely for the purpose of responding to my request and will not be shared with third parties.
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={!isFormValid() || isSubmitting}
                      className={`w-full h-14 xl:h-16 2xl:h-18 text-base xl:text-lg px-8 xl:px-10 font-medium tracking-wide transition-all duration-300 ${
                        !isFormValid() || isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed opacity-50'
                          : 'bg-[#DA743F] hover:bg-[#DA743F]/90 hover:scale-105 transform'
                      } text-white rounded-lg shadow-lg`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>Submit Inquiry</span>
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      )}
                    </Button>
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