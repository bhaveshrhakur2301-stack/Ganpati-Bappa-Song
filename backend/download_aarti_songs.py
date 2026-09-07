import yt_dlp
import os
import json

out_dir = r'C:\Users\SHIVAM THAKUR\OneDrive\Desktop\Ganpati baapa song\frontend\public\songs'
os.makedirs(out_dir, exist_ok=True)

ydl_opts = {
    'format': 'bestaudio/best',
    'outtmpl': os.path.join(out_dir, '%(id)s.%(ext)s'),
    'quiet': True,
    'extract_flat': 'discard_in_playlist',
}

queries = [
    'ytsearch1:Sukhkarta Dukhharta Aarti Full',
    'ytsearch1:Shendur Lal Chadhayo Aarti',
    'ytsearch1:Ghalin Lotangan Vandin Charan'
]

results = []
with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    for q in queries:
        try:
            print(f'Searching {q}...')
            info = ydl.extract_info(q, download=True)
            if 'entries' in info:
                info = info['entries'][0]
            
            ext = info.get('ext', 'm4a')
            print(f"Downloaded {info.get('title')}")
            results.append({
                'title': info.get('title', 'Unknown Aarti'),
                'audio_url': f'/songs/{info["id"]}.{ext}',
                'thumbnail_url': info.get('thumbnail', ''),
                'duration': str(info.get('duration_string', '5:00'))
            })
        except Exception as e:
            print(f'Error downloading {q}: {e}')

with open(r'C:\Users\SHIVAM THAKUR\OneDrive\Desktop\Ganpati baapa song\backend\aarti_songs.json', 'w') as f:
    json.dump(results, f)
print('Done!')
