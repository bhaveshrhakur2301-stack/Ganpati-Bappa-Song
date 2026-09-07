from rest_framework import serializers
from .models import Category, Song, Playlist, DailyContent

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class SongSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )

    class Meta:
        model = Song
        fields = '__all__'

class PlaylistSerializer(serializers.ModelSerializer):
    songs = SongSerializer(many=True, read_only=True)
    song_ids = serializers.PrimaryKeyRelatedField(
        queryset=Song.objects.all(), source='songs', many=True, write_only=True
    )

    class Meta:
        model = Playlist
        fields = '__all__'

class DailyContentSerializer(serializers.ModelSerializer):
    featured_song = SongSerializer(read_only=True)

    class Meta:
        model = DailyContent
        fields = '__all__'
