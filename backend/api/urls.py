from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, CommentViewSet, CustomAuthToken, UserRegisterView

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', CustomAuthToken.as_view(), name='api_token_auth'),
    path('register/', UserRegisterView.as_view(), name='api_register'),  # 👈 new
]
