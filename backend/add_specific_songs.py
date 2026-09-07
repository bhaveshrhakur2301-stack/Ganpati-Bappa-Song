import yt_dlp
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()
from api.models import Category, Song

out_dir = r'C:\Users\SHIVAM THAKUR\OneDrive\Desktop\Ganpati baapa song\frontend\public\songs'
os.makedirs(out_dir, exist_ok=True)

ydl_opts = {
    'format': 'bestaudio/best',
    'outtmpl': os.path.join(out_dir, '%(id)s.%(ext)s'),
    'quiet': True,
}

urls = [
    'https://youtu.be/kYQBwC744UQ',
    'https://youtu.be/v0c8MnyiddI',
    'https://youtu.be/EDjWTVHrMgQ'
]

cat_dj, _ = Category.objects.get_or_create(
    slug='ganpati-dj',
    defaults={'name': 'Ganpati DJ Remixes', 'description': 'Full length DJ mashups'}
)

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    for url in urls:
        try:
            print(f'Downloading {url}...')
            info = ydl.extract_info(url, download=True)
            if 'entries' in info:
                info = info['entries'][0]
            
            ext = info.get('ext', 'm4a')
            
            # Save to database
            Song.objects.get_or_create(
                title=info.get('title', 'Ganpati Special Song'),
                category=cat_dj,
                defaults={
                    'audio_url': f'/songs/{info["id"]}.{ext}',
                    'thumbnail_url': info.get('thumbnail', ''),
                    'duration': str(info.get('duration_string', '5:00'))
                }
            )
            print(f"Added to DB: {info.get('title')}")
            
        except Exception as e:
            print(f'Error downloading {url}: {e}')

print('All requested songs added successfully!')
