import React from 'react';
import AuthPage from './AuthPage';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import UrlShortenerForm from '@/components/url/urlShortenerForm';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-24">
      <div className="w-full max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Shorten Your Links
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Paste your long URL and get a shortened one. It's free and easy to
          use.
        </p>

        <Link href="/auth/login">
          <Button>Logic</Button>
        </Link>
        <Link href="/auth/register">
          <Button>Register</Button>
        </Link>
        <UrlShortenerForm />
      </div>
    </div>
  );
}
