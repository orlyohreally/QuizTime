from django.contrib import admin

from .models import Question, Choice, Test, Step, Topic

class QuestionInline(admin.StackedInline):
    model = Question
    extra = 2
class ChoiceInline(admin.StackedInline):
    model = Choice
    extra = 2

class TopicAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['name', 'icon']})
    ]
    def save_model(self, request, obj, form, change):
        obj.creator = request.user
        super().save_model(request, obj, form, change)
class TestAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['name', 'pub_date', 'topic', 'slug', ]})
    ]
    inlines = [QuestionInline]
    def save_model(self, request, obj, form, change):
        obj.creator = request.user
        super().save_model(request, obj, form, change)
class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['question_text']})
    ]
    inlines = [ChoiceInline]
admin.site.register(Question, QuestionAdmin)
admin.site.register(Test, TestAdmin)
admin.site.register(Topic, TopicAdmin)
admin.site.register(Step)


