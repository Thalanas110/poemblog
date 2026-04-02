ALTER TABLE public.poems
ADD COLUMN IF NOT EXISTS slug TEXT;

WITH base_slugs AS (
  SELECT
    id,
    COALESCE(NULLIF(lower(trim(both '-' from regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g'))), ''), 'poem') AS base_slug,
    created_at
  FROM public.poems
), ranked_slugs AS (
  SELECT
    id,
    CASE
      WHEN COUNT(*) OVER (PARTITION BY base_slug) > 1
        THEN base_slug || '-' || ROW_NUMBER() OVER (PARTITION BY base_slug ORDER BY created_at, id)
      ELSE base_slug
    END AS slug
  FROM base_slugs
)
UPDATE public.poems AS poems
SET slug = ranked_slugs.slug
FROM ranked_slugs
WHERE poems.id = ranked_slugs.id;

ALTER TABLE public.poems
ALTER COLUMN slug SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS poems_slug_key ON public.poems (slug);