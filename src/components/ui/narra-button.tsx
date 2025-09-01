import React from 'react';
import { cn } from './utils';
import { cva, type VariantProps } from 'class-variance-authority';

// Button Variants for Narra Cliffs
// Primary: Warm Gold background with Dark Text
// Secondary: Terracotta outline style
// Ghost: Transparent background
// Disabled: Muted state for all variants

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Button / Primary / Default, Hover, Pressed, Disabled
        primary: "bg-amber-400 text-gray-900 hover:bg-amber-500 active:bg-amber-600 disabled:bg-gray-300 disabled:text-gray-500",
        
        // Button / Secondary / Default, Hover, Pressed, Disabled  
        secondary: "border-2 border-orange-600 text-orange-600 bg-transparent hover:bg-orange-50 hover:border-orange-700 active:bg-orange-100 active:border-orange-800 disabled:border-gray-300 disabled:text-gray-400",
        
        // Button / Ghost / Default, Hover, Pressed, Disabled
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 disabled:text-gray-400",
        
        // Button / Disabled (universal disabled state)
        disabled: "bg-gray-200 text-gray-400 cursor-not-allowed"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface NarraButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const NarraButton = React.forwardRef<HTMLButtonElement, NarraButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
NarraButton.displayName = "NarraButton";

// Named button variants for specific use cases
export const PrimaryButton = React.forwardRef<HTMLButtonElement, Omit<NarraButtonProps, 'variant'>>(
  (props, ref) => <NarraButton variant="primary" ref={ref} {...props} />
);
PrimaryButton.displayName = "PrimaryButton";

export const SecondaryButton = React.forwardRef<HTMLButtonElement, Omit<NarraButtonProps, 'variant'>>(
  (props, ref) => <NarraButton variant="secondary" ref={ref} {...props} />
);
SecondaryButton.displayName = "SecondaryButton";

export const GhostButton = React.forwardRef<HTMLButtonElement, Omit<NarraButtonProps, 'variant'>>(
  (props, ref) => <NarraButton variant="ghost" ref={ref} {...props} />
);
GhostButton.displayName = "GhostButton";

export { NarraButton, buttonVariants };