-- Make the resumes bucket public so download links work in emails
UPDATE storage.buckets 
SET public = true 
WHERE id = 'resumes';

-- Add policy to allow public read access to resume files
CREATE POLICY "Allow public read access to resumes"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes');

-- Add policy to allow anyone to upload resumes (for the application form)
CREATE POLICY "Allow public upload to resumes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes');