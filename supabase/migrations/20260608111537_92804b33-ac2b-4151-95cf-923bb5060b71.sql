DROP POLICY IF EXISTS "Everyone can view products" ON public.products;
CREATE POLICY "Public can view products" ON public.products FOR SELECT TO anon, authenticated USING (true);
GRANT SELECT ON public.products TO anon;