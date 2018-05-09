from rest_framework import serializers
from tests.models import Test, Topic
from django.contrib.auth.models import User

class TestSerializer(serializers.HyperlinkedModelSerializer):
    creator = serializers.ReadOnlyField(source = 'creator.username')
    #name = serializers.HyperlinkedIdentityField(view_name = 'test-name', format = 'html')

    class Meta:
        model = Test
        fields = ('id', 'url', 'name', 'pub_date', 'creator')
        
class TopicSerializer(serializers.HyperlinkedModelSerializer):
    creator = serializers.ReadOnlyField(source = 'creator.username')

    class Meta:
        model = Topic
        fields = ('id', 'name', 'creat_date', 'creator')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    tests = serializers.HyperlinkedRelatedField(many = True, view_name = 'test-detail', read_only = True)

    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'tests')