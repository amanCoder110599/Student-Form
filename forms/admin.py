from django.contrib import admin

# Register your models here.
from .models import User # add this

class UserAdmin(admin.ModelAdmin):  # add this
    list_display = ('name', 'dob', 'email','phone') # add this

    # Register your models here.
admin.site.register(User, UserAdmin) # add this