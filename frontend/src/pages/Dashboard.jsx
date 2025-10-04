import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import UrlShortenerForm from '@/components/url/urlShortenerForm';
import { UserUrlsTable } from '@/components/url/user-urls-table';
import api from '@/lib/api';
import { useState } from 'react';
import { useEffect } from 'react';
// import { useAuth } from '@/hooks/use-auth';
// import api from '@/lib/api';

export default function Dashboard() {
  const [userUrls, setUserUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await api.get('/url/user'); // your API call
        if (res.data.success) {
          setUserUrls(res.data.urls);
        } else {
          console.error('Failed to fetch URLs');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  if (loading) return <p className="text-center py-8">Loading...</p>;

  return (
    <div className="min-h-[calc(100vh-64px-56px)]">
      <div className="container max-w-6xl mx-auto py-10 px-4 md:px-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>

        <div className="grid gap-8">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Create New Short URL</CardTitle>
              <CardDescription>
                Enter a long URL to create a shortened link. You can also
                customize the short code.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UrlShortenerForm />
            </CardContent>
          </Card>

          <Card className="shadow-sm border border-dashed">
            <CardHeader>
              <CardTitle>Your URLs</CardTitle>
              <CardDescription>
                Manage and track your shortened URLs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserUrlsTable urls={userUrls} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
