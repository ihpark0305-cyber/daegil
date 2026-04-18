# 대길 마법학교 v2 🏰

## Supabase SQL (테이블 없으면 실행)
```sql
alter table users add column if not exists magic_skill text;
alter table users add column if not exists favorite text;
alter table users add column if not exists my_spell text;
alter table users add column if not exists created_at timestamptz default now();

create table if not exists magic_sends (
  id text primary key,
  to_id text references users(id),
  from_name text,
  msg text,
  created_at timestamptz default now()
);

alter table posts add column if not exists img_url text;
alter table posts add column if not exists yt_url text;
alter table posts add column if not exists cheers jsonb default '[]';
```

## 실행
```bash
cp .env.example .env  # 수정 후
pip install -r requirements.txt
python app.py
```
→ http://localhost:5001
