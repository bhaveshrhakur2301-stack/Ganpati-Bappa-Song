from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, SongViewSet, PlaylistViewSet, DailyContentViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'songs', SongViewSet)
router.register(r'playlists', PlaylistViewSet)
router.register(r'daily-content', DailyContentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
