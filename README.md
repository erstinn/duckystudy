AI生成のHTML。勉強用のみ

Hardening

```sql
-- lock down schema creation
REVOKE CREATE ON SCHEMA public FROM anon, authenticated;

-- enable RLS
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_progress ENABLE ROW LEVEL SECURITY;

-- optional reset of table privileges
REVOKE ALL ON public.flashcards FROM anon, authenticated;
REVOKE ALL ON public.card_progress FROM anon, authenticated;

-- flashcards: read-only content
GRANT SELECT ON public.flashcards TO anon, authenticated;

CREATE POLICY "flashcards are readable by everyone"
ON public.flashcards
FOR SELECT
TO anon, authenticated
USING (true);

-- card_progress: user-owned rows only
GRANT SELECT, INSERT, UPDATE ON public.card_progress TO authenticated;

CREATE POLICY "users read their own progress"
ON public.card_progress
FOR SELECT
TO authenticated
USING ((select auth.uid()) = user_id);

CREATE POLICY "users insert their own progress"
ON public.card_progress
FOR INSERT
TO authenticated
WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "users update their own progress"
ON public.card_progress
FOR UPDATE
TO authenticated
USING ((select auth.uid()) = user_id)
WITH CHECK ((select auth.uid()) = user_id);
```
