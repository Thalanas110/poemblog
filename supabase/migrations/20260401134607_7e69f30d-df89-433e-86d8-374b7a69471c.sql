
-- Add image_url column to poems
ALTER TABLE public.poems ADD COLUMN image_url text DEFAULT NULL;

-- Create storage bucket for poem images
INSERT INTO storage.buckets (id, name, public) VALUES ('poem-images', 'poem-images', true);

-- Allow authenticated admins to upload images
CREATE POLICY "Admins can upload poem images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'poem-images' AND public.has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to update/delete images
CREATE POLICY "Admins can update poem images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'poem-images' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete poem images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'poem-images' AND public.has_role(auth.uid(), 'admin'::app_role));

-- Allow public read access to poem images
CREATE POLICY "Public can view poem images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'poem-images');
