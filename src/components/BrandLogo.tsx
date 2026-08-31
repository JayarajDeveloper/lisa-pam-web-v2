type BrandLogoProps = {
  variant?: 'dark' | 'light';
  className?: string;
};

/** Official LISA PAM lockup from liza-pam-frontend (mark + wordmark). */
export function BrandLogo({ variant = 'dark', className }: BrandLogoProps) {
  const src =
    variant === 'light' ? '/brand/logo-lisa-pam-light.png' : '/brand/logo-lisa-pam.png';

  return (
    <img
      className={className ? `brand-logo ${className}` : 'brand-logo'}
      src={src}
      alt="LISA PAM"
      width={248}
      height={100}
    />
  );
}
