'use client';

import PawLoading from '@/assets/icon/pawLoading';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { useSearchParams } from 'next/navigation';
import LoginPageForm from './components/content';

export default function Main() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirectUrl') || searchParams.get('callbackUrl') || '/damageDeclaration';
  
  // Use the protection hook but with redirectIfFound=true to handle redirecting authenticated users away
  const { isLoading } = useProtectedRoute({
    redirectTo: redirectUrl,
    redirectIfFound: true,
  });

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-[100dvh] w-full items-center justify-center">
        {/* <div className="w-24">
          <PawLoading className="size-24" />
        </div> */}
      </div>
    );
  }

  return <LoginPageForm callbackUrl={redirectUrl} />;
}

