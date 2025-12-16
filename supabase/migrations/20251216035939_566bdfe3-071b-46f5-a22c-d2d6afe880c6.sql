-- Create storage bucket for internship resumes
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resumes', 'resumes', false);

-- Allow anyone to upload resumes (public form)
CREATE POLICY "Anyone can upload resumes"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'resumes');

-- Allow reading resumes (for admin purposes via edge function)
CREATE POLICY "Service role can read resumes"
ON storage.objects
FOR SELECT
USING (bucket_id = 'resumes');