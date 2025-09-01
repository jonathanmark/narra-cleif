import React from 'react';
import { cn } from './utils';

// Typography Styles for Narra Cliffs
// Usage Notes:
// H1 Display: Main hero headlines, page titles
// H2 Heading: Section headers, major content blocks
// H3 Subheading: Subsection titles, card titles
// Body Copy: Main content, descriptions, form labels
// Small Caption: Supporting text, captions, metadata

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

// H1 - Display (48/56, Bold)
// Usage: Hero headlines, main page titles, primary call-to-action text
export function DisplayText({ children, className, as: Component = 'h1' }: TypographyProps) {
  return (
    <Component className={cn(
      "text-5xl leading-[3.5rem] font-bold tracking-tight text-gray-900",
      className
    )}>
      {children}
    </Component>
  );
}

// H2 - Heading (34/42, SemiBold)
// Usage: Section headers, major content blocks, feature titles
export function HeadingText({ children, className, as: Component = 'h2' }: TypographyProps) {
  return (
    <Component className={cn(
      "text-[2.125rem] leading-[2.625rem] font-semibold tracking-tight text-gray-900",
      className
    )}>
      {children}
    </Component>
  );
}

// H3 - Subheading (24/32, SemiBold)
// Usage: Subsection titles, card titles, form section headers
export function SubheadingText({ children, className, as: Component = 'h3' }: TypographyProps) {
  return (
    <Component className={cn(
      "text-2xl leading-8 font-semibold text-gray-900",
      className
    )}>
      {children}
    </Component>
  );
}

// Body - Copy (16/24, Regular)
// Usage: Main content, descriptions, form labels, navigation
export function BodyText({ children, className, as: Component = 'p' }: TypographyProps) {
  return (
    <Component className={cn(
      "text-base leading-6 font-normal text-gray-700",
      className
    )}>
      {children}
    </Component>
  );
}

// Small - Caption (12/16, Regular)
// Usage: Supporting text, captions, metadata, fine print
export function CaptionText({ children, className, as: Component = 'span' }: TypographyProps) {
  return (
    <Component className={cn(
      "text-xs leading-4 font-normal text-gray-500",
      className
    )}>
      {children}
    </Component>
  );
}

// Utility component for consistent text styling
export const Typography = {
  Display: DisplayText,
  Heading: HeadingText,
  Subheading: SubheadingText,
  Body: BodyText,
  Caption: CaptionText,
};