from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Event

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'date_time', 'place', 'manager')
    list_filter = ('date_time',)
    search_fields = ('name', 'description', 'place', 'manager__username')

    # поля ManyToMany будут отображаться с помощью фильтра выбора
    filter_horizontal = ('jury_members',)  