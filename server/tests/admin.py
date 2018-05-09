from django.contrib import admin

from .models import Question, Choice, Test

class QuestionInline(admin.StackedInline):
	model = Question
	extra = 2
class ChoiceInline(admin.StackedInline):
	model = Choice
	extra = 2

class TestAdmin(admin.ModelAdmin):
	fieldsets = [
		(None, {'fields': ['name', 'pub_date']})
	]
	inlines = [QuestionInline]
class QuestionAdmin(admin.ModelAdmin):
	fieldsets = [
		(None, {'fields': ['question_text']})
	]
	inlines = [ChoiceInline]
admin.site.register(Question, QuestionAdmin)
admin.site.register(Test, TestAdmin)


