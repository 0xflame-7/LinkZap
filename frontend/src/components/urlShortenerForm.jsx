import React from 'react';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';

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
      const response = await fetch('http://localhost:5000/url/generate', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      setShortUrl(result.shortUrl);
      setShortCode(result.shortCode);
      setIsLoding(false);
    } catch (error) {
      setError(error.message);
      setIsLoding(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto">
        <Form {...form}>
          <form className="space-y-4">
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
              <Button type="submit" disabled={false}>
                Shorten
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
