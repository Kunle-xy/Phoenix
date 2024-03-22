from django.contrib import admin
from .models import Plant, Record, CustomUser
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'farmName', 'farmLocation', 'farmSize', 'is_active')
    search_fields = ('email', 'first_name', 'last_name')


admin.site.register(CustomUser, CustomUserAdmin)

admin.site.register(Plant)
admin.site.register(Record)
