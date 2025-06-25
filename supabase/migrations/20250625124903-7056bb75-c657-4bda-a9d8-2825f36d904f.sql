
-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  title TEXT,
  bio TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  profile_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  technologies TEXT[],
  live_url TEXT,
  github_url TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'in-progress')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create job offers table
CREATE TABLE public.job_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_name TEXT,
  job_title TEXT,
  job_description TEXT,
  salary_range TEXT,
  location TEXT,
  job_type TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create contact messages table
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles (admin only)
CREATE POLICY "Admin can manage profiles" ON public.profiles
FOR ALL USING (auth.email() = 'r0548500974@gmail.com');

-- Create policies for projects (admin can manage, public can view)
CREATE POLICY "Admin can manage projects" ON public.projects
FOR ALL USING (auth.email() = 'r0548500974@gmail.com');

CREATE POLICY "Anyone can view projects" ON public.projects
FOR SELECT USING (true);

-- Create policies for job offers (anyone can insert, admin can view/manage)
CREATE POLICY "Anyone can submit job offers" ON public.job_offers
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can view job offers" ON public.job_offers
FOR SELECT USING (auth.email() = 'r0548500974@gmail.com');

CREATE POLICY "Admin can update job offers" ON public.job_offers
FOR UPDATE USING (auth.email() = 'r0548500974@gmail.com');

-- Create policies for contact messages (anyone can insert, admin can view/manage)
CREATE POLICY "Anyone can submit contact messages" ON public.contact_messages
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can view contact messages" ON public.contact_messages
FOR SELECT USING (auth.email() = 'r0548500974@gmail.com');

CREATE POLICY "Admin can update contact messages" ON public.contact_messages
FOR UPDATE USING (auth.email() = 'r0548500974@gmail.com');

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, name)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'name', 'רבקה'));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
