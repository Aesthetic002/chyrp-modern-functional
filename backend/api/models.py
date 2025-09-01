from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('published', 'Published'),
            ('draft', 'Draft'),
            ('private', 'Private')
        ],
        default='published'
    )

    def __str__(self):
        return self.title

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('approved', 'Approved'),
            ('pending', 'Pending'),
            ('spam', 'Spam')
        ],
        default='pending'
    )

    def __str__(self):
        return f'Comment by {self.author} on {self.post.title}'