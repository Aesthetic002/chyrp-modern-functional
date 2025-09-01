from rest_framework import serializers
from .models import Post, Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'content', 'created_at', 'status']
        read_only_fields = ['id', 'created_at', 'author']  # 👈 add this here too

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'created_at', 'status', 'comments']
        read_only_fields = ['id', 'created_at', 'author']  # 👈 already correct
