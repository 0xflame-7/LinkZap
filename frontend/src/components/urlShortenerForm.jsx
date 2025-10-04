import React from 'react';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';
import api from '@/lib/api';

const formSchema = z.object({
  url: z.string().url('Enter a valid URL'),
});

export default function UrlShortenerForm() {
  const [shortUrl, setShortUrl] = useState(null);
  const [shortCode, setShortCode] = useState(null);
  const [isLoading, setIsLoding] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoding(true);
    setError(null);
    setShortUrl(null);
    setShortCode(null);

    try {
      const formData = new FormData();
      formData.append('url', data.url);
      const response = await api.post('/url/shorten', formData);
      if (response.success && response.data) {
        const result = await response.json();
        setShortUrl(result.shortUrl);
        setShortCode(result.shortCode);
        console.log(shortCode);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setIsLoding(false);
    }
  };

  const copyToClipboard = async () => {
    if (!shortUrl) return;

    try {
      await navigator.clipboard.writeText(shortUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Paste your long URL here"
                        {...field}
                        disabled={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="mr-2 size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Shortening...
                  </>
                ) : (
                  'Shorten'
                )}
              </Button>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                {error}
              </div>
            )}

            {shortUrl && (
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Your shortened URL:
                  </p>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={shortUrl}
                      readOnly
                      className="font-medium"
                    />
                    <Button
                      type="button"
                      variant={'outline'}
                      className="flex-shrink-0"
                      onClick={copyToClipboard}
                    >
                      <Copy className="size-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}
