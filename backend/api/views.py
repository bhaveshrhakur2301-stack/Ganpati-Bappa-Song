from rest_framework import viewsets
from .models import Category, Song, Playlist, DailyContent
from .serializers import CategorySerializer, SongSerializer, PlaylistSerializer, DailyContentSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer

class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer

class DailyContentViewSet(viewsets.ModelViewSet):
    queryset = DailyContent.objects.all()
    serializer_class = DailyContentSerializer
