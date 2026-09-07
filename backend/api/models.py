from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    image_url = models.URLField(blank=True)

    def __str__(self):
        return self.name

class Song(models.Model):
    title = models.CharField(max_length=500)
    category = models.ForeignKey(Category, related_name='songs', on_delete=models.CASCADE)
    audio_url = models.URLField(max_length=1000)
    duration = models.CharField(max_length=10, blank=True)
    lyrics = models.TextField(blank=True)
    thumbnail_url = models.URLField(max_length=1000, blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Playlist(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    songs = models.ManyToManyField(Song, related_name='playlists')
    thumbnail_url = models.URLField(blank=True)
    is_public = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class DailyContent(models.Model):
    date = models.DateField(unique=True)
    thought_of_the_day = models.TextField()
    featured_song = models.ForeignKey(Song, null=True, blank=True, on_delete=models.SET_NULL)
    wallpaper_url = models.URLField(blank=True)

    def __str__(self):
        return f"Daily Content - {self.date}"
