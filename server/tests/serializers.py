from rest_framework import serializers
from tests.models import Test, Topic, Step
from django.contrib.auth.models import User
class TestSerializer(serializers.HyperlinkedModelSerializer):
    creator = serializers.ReadOnlyField(source = 'creator.username')
    #name = serializers.HyperlinkedIdentityField(view_name = 'test-name', format = 'html')
    class Meta:
        model = Test
        fields = ('id', 'url', 'name', 'pub_date', 'creator', 'topic', 'slug', 'icon')
        
class TopicSerializer(serializers.HyperlinkedModelSerializer):
    creator = serializers.ReadOnlyField(source = 'creator.username')
    creat_date = serializers.ReadOnlyField()
    
    class Meta:
        model = Topic
        fields = ('id', 'name', 'creat_date', 'creator', 'icon')
class StepSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = Step
        fields = ('id', 'text', 'icon', 'step_ind')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    tests = serializers.HyperlinkedRelatedField(many = True, view_name = 'test-detail', read_only = True)

    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'tests')