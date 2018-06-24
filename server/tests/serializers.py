from rest_framework import serializers
from tests.models import Topic, Test, Step, Subject, Question, Choice


from django.contrib.auth import authenticate
from .models import User
from rest_framework.fields import CurrentUserDefault

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length = 128,
        min_length = 8,
        write_only = True
    )

    # The client should not be able to send a token along with a registration
    # request. Making `token` read-only handles that for us.
    token = serializers.CharField(max_length = 255, read_only = True)

    class Meta:
        model = User
        # List all of the fields that could possibly be included in a request
        # or response, including fields specified explicitly above.
        fields = ['email', 'username', 'password', 'token']

    def create(self, validated_data):
        # Use the `create_user` method we wrote earlier to create a new user.
        return User.objects.create_user(**validated_data)

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length = 255)
    username = serializers.CharField(max_length = 255, read_only = True)
    password = serializers.CharField(max_length = 128, write_only = True)
    token = serializers.CharField(max_length = 255, read_only = True)

    def validate(self, data):
        # The `validate` method is where we make sure that the current
        # instance of `LoginSerializer` has "valid". In the case of logging a
        # user in, this means validating that they've provided an email
        # and password and that this combination matches one of the users in
        # our database.
        email = data.get('email', None)
        password = data.get('password', None)

        # Raise an exception if an
        # email is not provided.
        if email is None:
            raise serializers.ValidationError(
                'An email address is required to log in.'
            )

        # Raise an exception if a
        # password is not provided.
        if password is None:
            raise serializers.ValidationError(
                'A password is required to log in.'
            )

        # The `authenticate` method is provided by Django and handles checking
        # for a user that matches this email/password combination. Notice how
        # we pass `email` as the `username` value since in our User
        # model we set `USERNAME_FIELD` as `email`.
        user = authenticate(username = email, password = password)

        # If no user was found matching this email/password combination then
        # `authenticate` will return `None`. Raise an exception in this case.
        if user is None:
            raise serializers.ValidationError(
                'A user with this email and password was not found.'
            )

        # Django provides a flag on our `User` model called `is_active`. The
        # purpose of this flag is to tell us whether the user has been banned
        # or deactivated. This will almost never be the case, but
        # it is worth checking. Raise an exception in this case.
        if not user.is_active:
            raise serializers.ValidationError(
                'This user has been deactivated.'
            )

        # The `validate` method should return a dictionary of validated data.
        # This is the data that is passed to the `create` and `update` methods
        # that we will see later on.
        return {
            'email': user.email,
            'username': user.username,
            'token': user.token
        }
 
class UserSerializer(serializers.ModelSerializer):
    """Handles serialization and deserialization of User objects."""

    # Passwords must be at least 8 characters, but no more than 128 
    # characters. These values are the default provided by Django. We could
    # change them, but that would create extra work while introducing no real
    # benefit, so lets just stick with the defaults.
    password = serializers.CharField(
        max_length = 128,
        min_length = 8,
        write_only = True
    )
    tests = serializers.HyperlinkedRelatedField(many = True, view_name = 'test-detail', read_only = True)
    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'token', 'tests')

        # The `read_only_fields` option is an alternative for explicitly
        # specifying the field with `read_only = True` like we did for password
        # above. The reason we want to use `read_only_fields` here is that
        # we don't need to specify anything else about the field. The
        # password field needed the `min_length` and 
        # `max_length` properties, but that isn't the case for the token
        # field.
        read_only_fields = ('token',)


    def update(self, instance, validated_data):
        """Performs an update on a User."""

        # Passwords should not be handled with `setattr`, unlike other fields.
        # Django provides a function that handles hashing and
        # salting passwords. That means
        # we need to remove the password field from the
        # `validated_data` dictionary before iterating over it.
        password = validated_data.pop('password', None)

        for (key, value) in validated_data.items():
            # For the keys remaining in `validated_data`, we will set them on
            # the current `User` instance one at a time.
            setattr(instance, key, value)

        if password is not None:
            # `.set_password()`  handles all
            # of the security stuff that we shouldn't be concerned with.
            instance.set_password(password)

        # After everything has been updated we must explicitly save
        # the model. It's worth pointing out that `.set_password()` does not
        # save the model.
        instance.save()

        return instance
class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'short_description', 'long_description')
class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ('id', 'choice_text', 'votes')
class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many = True, read_only = True)
    class Meta:
        model = Question
        fields = ('id', 'question_text', 'choices')
class TestSerializer(serializers.ModelSerializer):
    creator = serializers.ReadOnlyField(source = 'creator.username')
    topic = serializers.ReadOnlyField(source = 'topic.name')
    subjects = SubjectSerializer(many = True, read_only = True)
    questions = QuestionSerializer(many = True, read_only = True)
    
    edit = serializers.SerializerMethodField()
    def get_edit(self, obj):
        return self.context['request'].user == obj.creator
    #name = serializers.HyperlinkedIdentityField(view_name = 'test-name', format = 'html')
    class Meta:
        model = Test
        fields = ('id', 'url', 'name', 'pub_date', 'creator', 'topic', 'slug', 'icon', 'subjects', 'questions', 'edit')
        
class TopicSerializer(serializers.HyperlinkedModelSerializer):
    creator = serializers.ReadOnlyField(source = 'creator.username')
    creat_date = serializers.ReadOnlyField()
    class Meta:
        model = Topic
        fields = ('id', 'name', 'creat_date', 'creator', 'icon', 'test_set',)
class TopicSelectSerializer(serializers.ModelSerializer):
    text = serializers.CharField(source='name')
    class Meta:
        model = Topic
        fields = ('id', 'text',)
class SubjectSelectSerializer(serializers.ModelSerializer):
    text = serializers.CharField(source='short_description')
    class Meta:
        model = Subject
        fields = ('id', 'text',)
    
class StepSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = Step
        fields = ('id', 'text', 'icon', 'step_ind')


# class UserSerializer(serializers.HyperlinkedModelSerializer):
    # tests = serializers.HyperlinkedRelatedField(many = True, view_name = 'test-detail', read_only = True)

    # class Meta:
        # model = User
        # fields = ('url', 'id', 'username', 'tests')