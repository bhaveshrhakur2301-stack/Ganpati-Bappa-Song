import json
import os
from django.core.management.base import BaseCommand
from api.models import Category, Song
from django.conf import settings

class Command(BaseCommand):
    help = 'Seeds the database with full-length downloaded Ganpati DJ songs and Aartis.'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding database with full-length DJ and Aarti songs...')

        # Categories
        cat_dj, _ = Category.objects.get_or_create(
            slug='ganpati-dj',
            defaults={'name': 'Ganpati DJ Remixes', 'description': 'Full length DJ mashups'}
        )
        cat_aarti, _ = Category.objects.get_or_create(
            slug='ganpati-aartis',
            defaults={'name': 'Ganpati Aartis', 'description': 'Full length traditional Aartis'}
        )

        Song.objects.all().delete()
        self.stdout.write("Cleared old short placeholder songs.")

        songs_created = 0

        # Load Aarti songs
        try:
            with open('aarti_songs.json', 'r') as f:
                aarti_songs = json.load(f)
            for i, track in enumerate(aarti_songs):
                Song.objects.create(
                    title=track['title'],
                    category=cat_aarti,
                    audio_url=track['audio_url'],
                    duration=track.get('duration', '0:00'),
                    thumbnail_url=track.get('thumbnail_url', ''),
                    is_featured=(i == 0)
                )
                songs_created += 1
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error loading aarti_songs.json: {e}'))

        # Load DJ songs
        try:
            with open('dj_songs.json', 'r') as f:
                dj_songs = json.load(f)
            for i, track in enumerate(dj_songs):
                Song.objects.create(
                    title=track['title'],
                    category=cat_dj,
                    audio_url=track['audio_url'],
                    duration=track.get('duration', '0:00'),
                    thumbnail_url=track.get('thumbnail_url', ''),
                    is_featured=(i == 0)
                )
                songs_created += 1
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error loading dj_songs.json: {e}'))

        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {songs_created} full-length songs! Total songs: {Song.objects.count()}'))
