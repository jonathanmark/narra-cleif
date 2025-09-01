import React from 'react';
import { cn } from './utils';
import { Check, X, AlertCircle, CheckCircle } from 'lucide-react';

// Form Components for Narra Cliffs
// Includes: text input, textarea, select, checkbox, radio, notifications
// States: default, focus, error, success, disabled

// Text Input Component (default, focus, error)
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helpText?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, error, success, helpText, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            className={cn(
              "flex h-10 w-full rounded-md border px-3 py-2 text-sm transition-colors",
              "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : success
                ? "border-green-500 focus:ring-green-500 focus:border-green-500"
                : "border-gray-300 focus:ring-amber-500 focus:border-amber-500",
              className
            )}
            ref={ref}
            {...props}
          />
          {(error || success) && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {error && <AlertCircle className="h-4 w-4 text-red-500" />}
              {success && <CheckCircle className="h-4 w-4 text-green-500" />}
            </div>
          )}
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {helpText && !error && <p className="text-sm text-gray-500">{helpText}</p>}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

// Textarea Component
interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, label, error, helpText, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm transition-colors",
            "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-amber-500 focus:border-amber-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        {helpText && !error && <p className="text-sm text-gray-500">{helpText}</p>}
      </div>
    );
  }
);
FormTextarea.displayName = "FormTextarea";

// Select Dropdown Component
interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, label, error, options, placeholder, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          className={cn(
            "flex h-10 w-full rounded-md border px-3 py-2 text-sm transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-amber-500 focus:border-amber-500",
            className
          )}
          ref={ref}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);
FormSelect.displayName = "FormSelect";

// Checkbox Component
interface FormCheckboxProps {
  label: string;
  error?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  required?: boolean;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  label,
  error,
  checked,
  onChange,
  required,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-start space-x-2">
        <div className="relative">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange?.(e.target.checked)}
            className={cn(
              "h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500",
              error && "border-red-500"
            )}
          />
        </div>
        <label className="text-sm text-gray-700 leading-5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

// Radio Group Component
interface RadioOption {
  value: string;
  label: string;
}

interface FormRadioGroupProps {
  label: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
}

export const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  required,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className={cn(
                "h-4 w-4 border-gray-300 text-amber-600 focus:ring-amber-500",
                error && "border-red-500"
              )}
            />
            <label className="text-sm text-gray-700">{option.label}</label>
          </div>
        ))}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

// Submit Button Component
interface FormSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  loading,
  children,
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className={cn(
        "w-full bg-amber-400 text-gray-900 font-medium py-2 px-4 rounded-md",
        "hover:bg-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2",
        "disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed",
        "transition-colors duration-200",
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
          <span>Submitting...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

// Success Notification Component
interface SuccessNotificationProps {
  title: string;
  message?: string;
  onClose?: () => void;
}

export const SuccessNotification: React.FC<SuccessNotificationProps> = ({
  title,
  message,
  onClose,
}) => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-md p-4">
      <div className="flex items-start">
        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-green-800">{title}</h3>
          {message && <p className="text-sm text-green-700 mt-1">{message}</p>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 text-green-400 hover:text-green-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// Error Notification Component
interface ErrorNotificationProps {
  title: string;
  message?: string;
  onClose?: () => void;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  title,
  message,
  onClose,
}) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          {message && <p className="text-sm text-red-700 mt-1">{message}</p>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 text-red-400 hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};