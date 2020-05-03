from django.core.validators import RegexValidator
from django.db import models

# Create your models here.
class User(models.Model):
    phone_regex=RegexValidator(regex=r'^\+?1?\d{9,14}$',message="Phone number must be entered in format: '+999999999'. Up to 14 digits allowed")
    name = models.CharField(max_length=60)
    dob = models.DateField()
    email = models.EmailField(unique=True)
    phone=models.CharField(validators=[phone_regex],max_length=17,unique=True)



    def _str_(self):
        return self.name